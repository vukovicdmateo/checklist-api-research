import express from 'express';

import { router as api } from './api/v1/index.js';

export const app = express();

app.use(express.json());

app.use('/api/v1', api);
app.use('/api', api);

app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Error. Route not found..',
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status);

  res.json({
    error: {
      status,
      message,
    },
  });
});
