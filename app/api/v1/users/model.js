import { hash, compare } from 'bcrypt';
import { z } from 'zod';

export const PersonSchema = z
  .object({
    name: z.string().trim(),
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.string().trim().email().toLowerCase(),
    password: z.string().trim().min(6).max(16),
  })
  .strict();

export const UserSchema = PersonSchema.merge(LoginSchema);

export const fields = [
  ...Object.keys(UserSchema.shape),
  'id',
  'createdAt',
  'updatedAt',
];

export const encryptPassword = (password) => {
  return hash(password, 10);
};

export const verifyPassword = (password, encryptedPassword) => {
  return compare(password, encryptedPassword);
};
