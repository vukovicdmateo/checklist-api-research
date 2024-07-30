import { z } from 'zod';
import validator from 'validator';

export const TodoSchema = z
  .object({
    title: z
      .string()
      .trim()
      .refine(
        (value) => validator.isAlphanumeric(validator.blacklist(value, '')),
        {
          message: 'title must contain only letters, numbers and spaces',
        }
      )
      .transform((value = '') => validator.escape(value)),
    description: z
      .string()
      .trim()
      .optional()
      .transform((value = '') => validator.escape(value)),
    completed: z.boolean().default(false),
    dueDate: z.string().optional(),
  })
  .strict();

export const fields = [
  ...Object.keys(TodoSchema.shape),
  'id',
  'createdAt',
  'updatedAt',
];
