import ContactMessage from '../models/ContactMessage.js';
import mongoose from 'mongoose';
import { sendContactNotification } from '../services/emailService.js';
import { contactSchema } from '../validators/contactValidator.js';

export async function submitContact(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: {
        code: 'DATABASE_UNAVAILABLE',
        message: 'The contact service is temporarily unavailable. Please try again later.',
      },
    });
  }

  const validation = contactSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Please check the submitted fields.',
        fields: validation.error.flatten().fieldErrors,
      },
    });
  }

  try {
    const submission = await ContactMessage.create(validation.data);

    try {
      const notification = await sendContactNotification(submission);
      submission.notificationStatus = 'sent';
      submission.notificationProviderId = notification.id;
      submission.notificationSentAt = new Date();
      await submission.save();
      return res.status(201).json({ success: true, notificationSent: true });
    } catch (emailError) {
      submission.notificationStatus = 'failed';
      await submission.save();
      console.error('Contact notification delivery failed:', emailError.message);
      return res.status(202).json({ success: true, notificationSent: false });
    }
  } catch (error) {
    return next(error);
  }
}
