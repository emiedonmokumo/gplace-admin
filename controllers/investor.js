import Investor from '../models/Investor.js'

export const getAllInvestors = async (req, res) => {
    try {
        const investors = await Investor.find()
        res.status(200).json(investors)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getInvestor = async (req, res) => {
    try {
        const investor = await Investor.findOne({ _id: req.params.id })
        res.status(200).json(investor)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}