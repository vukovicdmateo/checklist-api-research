import { prisma } from '../../../database.js';
import { parsePaginationParams, parseSortParams } from '../../../utils.js';
import { GroupSchema, fields } from './model.js';

export const create = async (req, res, next) => {
  const { body = {} } = req;
  const { locals = {} } = res;
  const { decoded = {} } = locals;
  const { id: userId } = decoded;

  try {
    const { success, error, data } = await GroupSchema.safeParseAsync(body);

    if (!success) {
      return next({
        message: 'Validation error',
        status: 400,
        error,
      });
    }

    const group = await prisma.group.create({
      data: {
        ...data,
        userId,
      },
    });

    res.json({
      data: group,
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
      prisma.group.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          _count: {
            select: {
              todo: true,
            },
          },
        },
      }),
      prisma.group.count(),
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
    const data = await prisma.group.findUnique({
      where: {
        id,
      },
    });

    if (data === null) {
      return next({
        message: `Group not found`,
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
    const { success, error, data } = await GroupSchema.partial().safeParseAsync(
      body
    );

    if (!success) {
      return next({
        message: 'Validation error',
        status: 400,
        error,
      });
    }

    const group = await prisma.group.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        _count: {
          select: {
            todos: true,
          },
        },
      },
    });

    res.json({
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.group.delete({
      where: {
        id,
      },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
