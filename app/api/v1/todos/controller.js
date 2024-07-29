import { prisma } from '../../../database.js';
import { parsePaginationParams, parseSortParams } from '../../../utils.js';
import { fields } from './model.js';

export const create = async (req, res, next) => {
  const { body = {} } = req;
  const { locals = {} } = res;
  const { decoded = {} } = locals;
  const { id: userId } = decoded;

  try {
    const data = await prisma.tODO.create({
      data: {
        ...body,
        userId,
      },
    });

    res.json({
      data,
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

  const { groupId } = params;

  try {
    const [data, total] = await Promise.all([
      prisma.tODO.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          [orderBy]: direction,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        where: {
          groupId,
        },
      }),
      prisma.tODO.count({
        where: {
          groupId,
        },
      }),
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
