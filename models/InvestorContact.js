import mongoose, { Schema, Model } from 'mongoose';

// Define the Mongoose schema for InvestorContact
const InvestorContactSchema = new Schema(
  {
    investor: {
      type: Schema.Types.ObjectId,
      ref: 'Investor',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    title: { type: String, required: true },
    contactType: { type: String, enum: ["Secondary", "Primary"], default: 'Secondary' },
  },
  { timestamps: true }
);

// Create the Mongoose model with the defined schema
const InvestorContact = mongoose.models.InvestorContact || mongoose.model('InvestorContact', InvestorContactSchema);

export default InvestorContact;
