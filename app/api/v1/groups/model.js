import { z } from 'zod';
import validator from 'validator';

export const GroupSchema = z
  .object({
    title: z
      .string()
      .trim()
      .transform((value) => validator.escape(value)),
  })
  .strict();

export const fields = [
  ...Object.keys(GroupSchema.shape),
  'id',
  'createdAt',
  'updatedAt',
];
