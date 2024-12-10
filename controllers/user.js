import User from '../models/User.js'

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id })
        if (!user) res.status(404).json({ message: 'User not found' })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id })
        if (!user) res.status(404).json({ message: 'User not found' })

        await User.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: 'User Deleted successfully!'})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { bio, company, team, credentials, role } = req.body;

        // Find the user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create an object to store the update data
        const updateData = {};

        // Dynamically add fields to the update object if they exist in the request body
        if (bio) updateData.bio = bio;
        if (company) updateData.company = company;
        if (team) updateData.team = team;
        if (credentials) updateData.credentials = credentials;
        if (role) updateData.role = role;

        // Update the user with the filtered data
        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated user object
            runValidators: true, // Run validators on updated fields
        });

        res.status(200).json({ message: 'Updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
