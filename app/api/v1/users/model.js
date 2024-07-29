import { hash, compare } from 'bcrypt';

export const fields = [
  'id',
  'name',
  'email',
  'password',
  'createdAt',
  'updatedAt',
];

export const encryptPassword = (password) => {
  return hash(password, 10);
};

export const verifyPassword = (password, encryptedPassword) => {
  return compare(password, encryptedPassword);
};
