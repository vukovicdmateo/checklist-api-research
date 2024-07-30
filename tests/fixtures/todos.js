import { faker } from '@faker-js/faker';

export const generateTodo = (overrides = {}) => {
  return Object.assign(
    {
      title: faker.lorem.word(),
      description: faker.lorem.paragraph({ max: 1 }),
      completed: faker.datatype.boolean(),
      dueDate: faker.date.soon(),
    },
    overrides
  );
};
