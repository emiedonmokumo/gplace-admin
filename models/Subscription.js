import mongoose, { Schema } from 'mongoose';

// Define the Subscription schema
const subscriptionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        customerId: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            default: 0,
            required: true,
        },
        plan: {
            type: String,
            enum: ['Free', 'Platinum'],
        },
        startDate: { type: Date, default: null }, // Allow null
        endDate: { type: Date, default: null },   // Allow null
        status: {
            type: String,
            enum: ['Active', 'Expired', 'Free'],
        },
    },
    { timestamps: true }
);

// Pre-save hook to set the status
subscriptionSchema.pre('save', function (next) {
    const now = new Date();

    // Check the plan and endDate to determine the status
    if (this.plan === 'Platinum') {
        if (this.endDate && this.endDate < now) {
            this.status = 'Expired';
        } else {
            this.status = 'Active';
        }
    }
    next();
});

// Define the Subscription model with TypeScript types
const Subscription =
    mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);

export default Subscription;