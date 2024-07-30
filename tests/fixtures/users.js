import { faker } from '@faker-js/faker';

export const generateUser = (overrides = {}) => {
  return Object.assign(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
    },
    overrides
  );
};
