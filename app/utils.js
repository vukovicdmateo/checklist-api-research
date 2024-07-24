import { configuration } from './config.js';

const { pagination, order } = configuration;

export const parsePaginationParams = ({
  limit = pagination.limit,
  offset = pagination.offset,
}) => ({
  limit: !Number.isNaN(Number.parseInt(limit))
    ? Number.parseInt(limit)
    : pagination.limit,
  offset: !Number.isNaN(Number.parseInt(offset))
    ? Number.parseInt(offset)
    : pagination.offset,
});

export const parseSortParams = ({
  fields = [],
  direction = order.direction,
  orderBy = order.orderBy,
}) => ({
  orderBy: fields.includes(orderBy) ? orderBy : order.orderBy,
  direction: order.options.includes(direction) ? direction : order.direction,
});
