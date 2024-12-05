import InvestorContact from '../models/InvestorContact.js'

export const getInvestorContacts = async (req, res) => {
    try {
        const contacts = await InvestorContact.find({ user: req.params.userId })
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}