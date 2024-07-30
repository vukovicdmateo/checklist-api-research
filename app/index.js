import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { router as api } from './api/v1/index.js';
import { HTTPlogger, logger } from './logger.js';

export const app = express();

// Parse JSON
app.use(express.json());

// Request ID
app.use((req, res, next) => {
  const id = uuidv4();
  req.id = id;
  res.setHeader('X-Request-Id', id);

  next();
});

// Log HTTP Requests
app.use(HTTPlogger);

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
  const { statusCode = 500, message, error } = err;

  const data = {
    message,
    statusCode,
    error,
    traceId: req.id,
  };

  if (statusCode < 500) {
    logger.warn(data);
  } else {
    logger.error(data);
  }

  res.status(statusCode);

  res.json(data);
});
