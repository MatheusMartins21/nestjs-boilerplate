import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().optional().default(587),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof envSchema>;
