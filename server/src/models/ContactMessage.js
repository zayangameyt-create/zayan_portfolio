import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 254,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3000,
  },
  notificationStatus: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending',
  },
  notificationProviderId: {
    type: String,
    default: null,
  },
  notificationSentAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true, versionKey: false });

contactMessageSchema.index({ createdAt: -1 });

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
