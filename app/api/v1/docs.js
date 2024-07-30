import merge from 'lodash/merge.js';
import { todoDefiniton } from './todos/docs.js';

export const swaggerDefinition = merge(
  {
    openapi: '3.1.0',
    info: {
      title: 'Checklist API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${process.env.API_URL}/v1`,
      },
    ],
  },
  todoDefiniton
);
