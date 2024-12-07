import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    bio: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      title: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phone: { type: String },
      linkedIn: { type: String },
      x: { type: String },
      country: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    company: {
      name: { type: String, required: true },
      country: { type: String, required: true },
      city: { type: String, required: true },
      email: { type: String },
      website: { type: String },
      industry: { type: String, required: true },
      industryType: { type: String },
      foundingYear: { type: Number, required: true },
      revenue: {
        ltm: { type: Number, required: true, default: 0 },
        previousYear: { type: Number, default: 0 },
      },
      grossProfit: {
        ltm: { type: Number, default: 0 },
        previousYear: { type: Number, default: 0 },
      },
      EBITDA: {
        ltm: { type: Number, required: true, default: 0 },
        previousYear: { type: Number, default: 0 },
      },
    },
    team: {
      team1: { fullName: String, email: String },
      team2: { fullName: String, email: String },
    },
    credentials: {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      passwordReset: {
        code: Number,
        expiryDate: Date,
      },
      isVerified: { type: Boolean, default: false },
      verificationCode: String,
    },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
