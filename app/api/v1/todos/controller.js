export const create = (req, res, next) => {
  const { body = {} } = req;
  res.json({
    data: body,
  });
};

export const all = (req, res, next) => {
  const { query = {} } = req;
  const { limit = 10, offset = 0 } = query;

  res.json({
    meta: {
      limit,
      offset,
    },
  });
};

export const read = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  res.json({
    data: {
      id,
    },
  });
};

export const update = (req, res, next) => {
  res.json({});
};

export const remove = (req, res, next) => {
  res.json({});
};
