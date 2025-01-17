export const todoDefiniton = {
  paths: {
    '/todos/': {
      get: {
        description: 'Get all todos',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: '#/components/schemas/Todo',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        description: 'create a todo',
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TodoCreate',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      'type:': 'object',
                      $ref: '#/components/schemas/Todo',
                    },
                  },
                },
              },
            },
          },
          401: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedError',
                },
              },
            },
          },
        },
      },
    },
    '/todos/{todoId}': {
      get: {
        description: 'Get one todo by Id',
        parameters: [
          {
            name: 'todoId',
            in: 'path',
            description: 'Id of the Todo',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      $ref: '#/components/schemas/Todo',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'apiKey',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
    },
    schemas: {
      UnauthorizedError: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Unauthorized',
              },
            },
            status: {
              type: 'integer',
              example: '401',
            },
          },
        },
      },
      Todo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'e6476647-475b-45f8-92a5-40edb3649505',
          },
          title: {
            type: 'string',
            example: 'Buy milk',
          },
          description: {
            type: 'string',
            example: '',
          },
          completed: {
            type: 'boolean',
            example: 'false',
          },
          dueDate: {
            type: 'string',
            format: 'date-time',
            example: '2024-09-05T03:30:46.150Z',
          },
          userId: {
            type: 'string',
            example: 'e6476647-475b-45f8-92a5-40edb3649505',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-09-05T03:30:46.150Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-09-05T03:30:46.150Z',
          },
        },
      },
      TodoCreate: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Buy milk',
          },
          description: {
            type: 'string',
            example: '',
          },
          completed: {
            type: 'boolean',
            example: 'false',
          },
          dueDate: {
            type: 'string',
            format: 'date-time',
            example: '2024-09-05T03:30:46.150Z',
          },
        },
      },
    },
  },
};
