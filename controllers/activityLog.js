import ActivityLog from "../models/ActivityLog.js";

export const getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(50); // Fetch recent logs
        res.status(200).json(logs)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}