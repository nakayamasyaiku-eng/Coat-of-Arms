import {z} from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  phone: z.string().trim().min(5),
  country: z.string().trim().min(2),
  address: z.string().trim().min(5),
  city: z.string().trim().min(2),
  postal: z.string().trim().min(2),
  language: z.enum(['en', 'zh']),
  time: z.string().optional(),
  notes: z.string().max(1000).optional(),
  consent: z.boolean().refine((value) => value, {message: 'Consent is required'})
});

export const checkoutSchema = z.object({
  slugs: z.array(z.string()).min(1).max(9),
  contact: contactSchema,
  orderReference: z.string().min(8),
  locale: z.enum(['en', 'zh'])
});

export const inquirySchema = z.object({
  name: z.string().trim().min(2), email: z.email(),
  subject: z.string().trim().min(3), message: z.string().trim().min(10).max(3000)
});
