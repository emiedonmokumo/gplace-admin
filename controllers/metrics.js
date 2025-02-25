import Subscription from "../models/Subscription.js";
import User from "../models/User.js";

export const getMetrics = async (req, res) => {
    try {
        // Fetch all users and join with their subscription details
        const users = await User.find().lean();

        // Fetch subscriptions and map them to user IDs
        const subscriptions = await Subscription.find({}, 'user plan')
            .lean();

        // Map subscriptions to users
        const userWithSubscriptions = users.map(user => {
            const userSubscription = subscriptions.find(sub => sub.user.toString() === user._id.toString());
            return {
                ...user,
                subscription: userSubscription ? userSubscription.plan : 'Free' // Default to Free if no subscription
            };
        });

        // Get timestamp for 24 hours ago
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Count users who have updated their records in the last 24 hours
        const activeUsers = await User.countDocuments({ updatedAt: { $gte: yesterday } });


        // Filter paid users
        const paidUsers = userWithSubscriptions.filter(user => user.subscription === 'Platinum');

        res.status(200).json({ users: users.length, paidUsers: paidUsers.length, activeUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
