import { prisma } from '../../../database.js';
import { parsePaginationParams, parseSortParams } from '../../../utils.js';
import {
  encryptPassword,
  fields,
  LoginSchema,
  UserSchema,
  verifyPassword,
} from './model.js';
import { signToken } from '../auth.js';

export const signup = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const { success, error, data } = await UserSchema.safeParseAsync(body);

    if (!success) {
      return next({
        message: 'Validation error',
        status: 400,
        error,
      });
    }

    const password = await encryptPassword(data.password);
    const user = await prisma.user.create({
      data: {
        ...data,
        password,
      },
      select: {
        name: true,
        email: true,
      },
    });

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const { success, error, data } = await LoginSchema.safeParseAsync(body);

    if (!success) {
      return next({
        message: 'Validation error',
        status: 400,
        error,
      });
    }

    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return next({
        status: 404,
        message: 'Invalid email or password',
      });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return next({
        status: 400,
        message: 'Invalid email or password',
      });
    }

    const token = signToken({ id: user.id });

    res.json({
      data: {
        ...user,
        id: undefined,
        password: undefined,
      },
      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const all = async (req, res, next) => {
  const { query = {} } = req;
  const { limit, offset } = parsePaginationParams(query);

  const { orderBy, direction } = parseSortParams({
    fields,
    ...query,
  });

  try {
    const [data, total] = await Promise.all([
      prisma.user.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
      }),
      prisma.user.count(),
    ]);

    res.json({
      data,
      meta: {
        limit,
        offset,
        total,
        orderBy,
        direction,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (data === null) {
      return next({
        message: `User not found`,
        status: 404,
      });
    } else {
      res.locals.data = data;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const read = (req, res, next) => {
  const { locals = {} } = res;
  const { data } = locals;

  res.json({
    data,
  });
};

export const update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const { success, error, data } = await UserSchema.safeParseAsync(body);

    if (!success) {
      return next({
        message: 'Validation error',
        status: 400,
        error,
      });
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      select: {
        name: true,
        email: true,
      },
    });

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
