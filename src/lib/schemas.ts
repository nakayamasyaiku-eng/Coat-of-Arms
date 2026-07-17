import {z} from 'zod';

export const inquirySchema = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  phone: z.string().trim().max(80).optional(),
  country: z.string().trim().max(80).optional(),
  work: z.string().trim().min(1).max(120),
  message: z.string().trim().min(5).max(3000)
});
