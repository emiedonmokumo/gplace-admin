import Investor from '../models/Investor.js'

export const createInvestor = async (req, res) => {
    try {
        const {
            user,
            companyInfo,
            investmentBio,
            targetInfo,
            paidInfo,
            offeredPrice,
            primaryContact,
            vertical,
            status,
        } = req.body;

        // Create a new investor instance
        const newInvestor = new Investor({
            user,
            companyInfo,
            investmentBio,
            targetInfo,
            paidInfo,
            offeredPrice,
            primaryContact,
            vertical,
            status,
        });

        // Save the investor to the database
        const savedInvestor = await newInvestor.save();

        // Return the saved investor document
        res.status(201).json({
            message: "Investor created successfully",
            data: savedInvestor,
        });
    } catch (error) {
        console.error("Error creating investor:", error);
        res.status(500).json({
            message: "An error occurred while creating the investor",
            error: error.message,
        });
    }
};

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

export const deleteInvestor = async (req, res) => {
    try {
        const investor = await Investor.findOneAndDelete({ _id: req.params.id })
        if(!investor) res.status(200).json({ message: "Investor not found"})
        res.status(200).json({ message: "Investor deleted successfully!"})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}