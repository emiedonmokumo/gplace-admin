import Investor from '../models/Investor.js'

export const getAllInvestors = async (req, res) =>{
    const investors = await Investor.find()
    res.status(200).json(investors)
}