import { z } from 'zod';

function normalizeEmailList(value) {
  return value.split(',').map((address) => {
    const angleAddress = address.match(/<\s*([^<>]+)\s*>/);
    return (angleAddress?.[1] ?? address).trim();
  });
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  FRONTEND_ORIGIN: z.string().min(1).default('http://localhost:5173,https://zayanithub.site,https://www.zayanithub.site'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  EMAIL_PROVIDER: z.enum(['resend', 'smtp']).default('resend'),
  RESEND_API_KEY: z.string().trim().optional(),
  EMAIL_FROM: z.string().trim().optional(),
  SUPPORT_EMAIL: z.string().trim()
    .transform(normalizeEmailList)
    .pipe(z.array(z.string().email('SUPPORT_EMAIL must contain valid email addresses')).min(1)),
  CONTACT_TO_EMAIL: z.string().trim().optional()
    .transform((value) => value ? normalizeEmailList(value) : undefined),
  SMTP_HOST: z.string().trim().optional(),
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).optional(),
  SMTP_SECURE: z.enum(['true', 'false']).default('false').transform((value) => value === 'true'),
  SMTP_USER: z.string().trim().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().trim().optional(),
}).superRefine((value, context) => {
  value.CONTACT_TO_EMAIL?.forEach((address) => {
    if (!z.string().email().safeParse(address).success) {
      context.addIssue({
        code: 'custom',
        path: ['CONTACT_TO_EMAIL'],
        message: 'CONTACT_TO_EMAIL must contain valid email addresses',
      });
    }
  });

  if (value.EMAIL_PROVIDER === 'resend' && !value.RESEND_API_KEY) {
    context.addIssue({
      code: 'custom',
      path: ['RESEND_API_KEY'],
      message: 'RESEND_API_KEY is required when EMAIL_PROVIDER=resend',
    });
  }

  if (value.EMAIL_PROVIDER === 'resend' && !value.EMAIL_FROM) {
    context.addIssue({
      code: 'custom',
      path: ['EMAIL_FROM'],
      message: 'EMAIL_FROM is required when EMAIL_PROVIDER=resend',
    });
  }

  if (value.EMAIL_PROVIDER !== 'smtp') return;

  for (const key of ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']) {
    if (!value[key]) {
      context.addIssue({
        code: 'custom',
        path: [key],
        message: `${key} is required when EMAIL_PROVIDER=smtp`,
      });
    }
  }
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const issues = result.error.issues.map(({ path, message }) => `${path.join('.')}: ${message}`);
  throw new Error(`Invalid server configuration:\n${issues.join('\n')}`);
}

export const env = {
  ...result.data,
  CONTACT_TO_EMAIL: result.data.CONTACT_TO_EMAIL ?? result.data.SUPPORT_EMAIL,
};
