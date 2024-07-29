import jwt from 'jsonwebtoken';

import { configuration } from '../../config';

const { token } = configuration;
const { secret, expires } = token;

export const signToken = (payload, expiresIn = expires) => {
  jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn,
  });
};

export const auth = (req, res, next) => {
  let token = req.headers.authorization || '';
  if (token.startsWith('Bearer')) {
    token = token.substring(7);
  }

  if (!token) {
    return next({
      message: 'Unauthorized',
      status: 401,
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return next({
        message: 'Unauthorized',
        status: 401,
      });
    } else {
      res.locals.decoded = decoded;
      next();
    }
  });
};
