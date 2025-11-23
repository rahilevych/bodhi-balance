import { z } from 'zod';

export const schemaPersonalData = z.object({
  name: z.string().min(3, 'Name must be at least 3 symbols'),
  email: z.string().email('Invalid email format'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9()+\- ]+$/.test(val), {
      message: 'Invalid phone number',
    }),
  address: z.string().optional(),
});
export type UserFormData = z.infer<typeof schemaPersonalData>;
