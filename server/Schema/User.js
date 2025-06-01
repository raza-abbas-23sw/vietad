import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'seo_manager', 'content_editor'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active',
  },
  authProvider: {
    type: String,
    enum: ['google', 'email'],
  },
}, {
  timestamps: true, // ⬅️ This adds createdAt and updatedAt fields automatically
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
