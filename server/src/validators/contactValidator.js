import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter at least 2 characters.').max(80, 'Name must be 80 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.').max(254, 'Email address is too long.').transform((email) => email.toLowerCase()),
  message: z.string().trim().min(10, 'Please add a little more detail (at least 10 characters).').max(3000, 'Message must be 3,000 characters or fewer.'),
}).strict();
