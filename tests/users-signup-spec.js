import request from 'supertest';

import { app } from '../app/index';
import { beforeEach, describe, expect } from 'vitest';
import { resetDB } from './helpers/reset-db';
import { generateUser } from './fixtures/users';
import { generateTodo } from './fixtures//todos';

describe('Users Sign Up', () => {
  beforeEach(async () => {
    await resetDB();
  });

  test('signed successfully', async () => {
    const agent = request(app);

    const { name, email, password } = generateUser();
    const { title, description, completed, dueDate } = generateTodo();

    const body = {
      name,
      email,
      password,
    };

    const signup = await agent.post('/api/users/signup').send(body);

    expect(signup.status).toBe(200);

    const login = await agent
      .post('/api/users/signin')
      .send({ email: body.email, password: body.password });

    expect(login.status).toBe(200);

    const token = login.body.meta.token;

    const todo = await agent
      .post('/api/todos')
      .send({
        title,
        description,
        completed,
        dueDate,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(todo.status).toBe(200);

    const { id } = todo.body.data;

    const singleTodo = await agent.get(`/api/todos/${id}`);

    expect(singleTodo.status).toBe(200);

    const todos = await agent.get('/api/todos');
    expect(todos.status).toBe(200);
  });
});
