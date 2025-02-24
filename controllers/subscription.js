import Subscription from "../models/Subscription.js";

export const getSubscribers = async (req, res) => {
    try {
        // Fetch subscriptions and populate user details
        const subscribers = await Subscription.find()
            .populate('user', 'bio.firstName bio.lastName') // Get user’s first and last name
            .select('user status plan endDate');

        // Format response
        const formattedSubscribers = subscribers.map(sub => ({
            userId: sub.user._id,
            name: sub.user.bio.firstName + ' ' + sub.user.bio.lastName,
            status: sub.status,
            plan: sub.plan,
            expiryDate: sub.endDate,
        }));

        res.status(200).json(formattedSubscribers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};