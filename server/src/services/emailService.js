import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const resendTestSender = 'Zayan IT Hub <onboarding@resend.dev>';
let resend;
let smtpTransporter;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

export async function sendContactNotification(contact) {
  const safeName = escapeHtml(contact.name);
  const safeEmail = escapeHtml(contact.email);
  const safeMessage = escapeHtml(contact.message);
  const emailContent = {
    to: env.CONTACT_TO_EMAIL,
    replyTo: contact.email,
    subject: 'New portfolio contact message',
    text: `Name: ${contact.name}\nEmail: ${contact.email}\n\n${contact.message}`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#18201b"><h2>New portfolio contact message</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p style="white-space:pre-wrap">${safeMessage}</p></div>`,
  };

  if (env.EMAIL_PROVIDER === 'smtp') {
    const smtpPassword = env.SMTP_HOST.toLowerCase() === 'smtp.gmail.com'
      ? env.SMTP_PASS.replace(/\s+/g, '')
      : env.SMTP_PASS;

    smtpTransporter ??= nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: smtpPassword,
      },
    });

    const result = await smtpTransporter.sendMail({
      ...emailContent,
      from: env.SMTP_FROM || env.SMTP_USER,
    });

    if (!result.messageId) {
      throw new Error('SMTP returned no message ID for the contact message.');
    }

    return { id: result.messageId };
  }

  resend ??= new Resend(env.RESEND_API_KEY);
  const email = { ...emailContent, from: env.EMAIL_FROM, replyTo: [contact.email] };
  let result = await resend.emails.send(email);

  if (result.error && env.EMAIL_FROM !== resendTestSender && isSenderVerificationError(result.error)) {
    result = await resend.emails.send({ ...email, from: resendTestSender });
  }

  const { data, error } = result;

  if (error) {
    throw new Error(`Resend email delivery failed (${error.name}): ${error.message}`);
  }

  if (!data?.id) {
    throw new Error('Resend returned no email ID for the contact message.');
  }

  return data;
}

function isSenderVerificationError(error) {
  const details = `${error.name} ${error.message}`.toLowerCase();
  return error.statusCode === 403 || /verified domain|domain is not verified|testing emails/.test(details);
}
