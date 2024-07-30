import request from 'supertest';

import { app } from '../app/index';
import { beforeAll, beforeEach, describe, expect } from 'vitest';
import { resetDB } from './helpers/reset-db';

describe('Users Sign Up', () => {
  beforeEach(async () => {
    await resetDB();
  });

  test('signed successfully', async () => {
    const agent = request(app);

    const body = {
      name: 'Mateo',
      email: 'mateo@test.com',
      password: '12345678',
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
        title: 'Buy Milk',
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
