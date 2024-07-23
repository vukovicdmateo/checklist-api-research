import { prisma } from '../../../database.js';
import { parsePaginationParams } from '../../../utils.js';

export const create = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const data = await prisma.tODO.create({ data: body });

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const all = async (req, res, next) => {
  const { query = {} } = req.query;
  const { limit, offset } = parsePaginationParams(query);
  try {
    const [data, total] = await Promise.all([
      prisma.tODO.findMany({
        skip: offset,
        take: limit,
      }),
      prisma.tODO.count(),
    ]);

    res.json({
      data,
      meta: {
        limit,
        offset,
        total,
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
    const data = await prisma.tODO.findUnique({
      where: {
        id,
      },
    });

    if (data === null) {
      return next({
        message: `TODO not found`,
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
    const data = await prisma.tODO.update({
      where: {
        id,
      },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.tODO.delete({
      where: {
        id,
      },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};