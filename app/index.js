import express from 'express';

export const app = express();

app.get('/', (_req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

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
