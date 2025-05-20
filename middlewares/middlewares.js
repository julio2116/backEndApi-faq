const createId = (req, res, next) => {
  req.body.id = `item-${Math.floor(Math.random() * 10000)}`;
  next();
};

const validateValues = (req, res, next) => {
  const keys = Object.getOwnPropertyNames(req.body);

  keys.forEach(key => {
    if (!req.body[key]) {
      return res.status(400).json({
        status: "Failed",
        data: "Please inform all required keys",
      })
    }
  });
  next();
};

const validateKeys = (req, res, next) => {
  const keys = ['question', 'answer', 'id'];
  const bodyKeys = Object.getOwnPropertyNames(req.body);
  bodyKeys.forEach(key => {
    if (!keys.includes(key)) {
      return res.status(400).json({
        status: 'failed',
        data: 'inform only valid keys'
      })
    }
  });
  next();
}

const verifyMethod = (req, res, next) => {
  const methods = ['GET', 'POST', 'PATCH', 'DELETE'];
  if (!methods.includes(req.method)) {
    return res.status(405).json({
      status: 'Failed',
      data: `This method is not supported please try one of the follows: ${methods}`
    });
  }
  next();
};

module.exports = {
  createId,
  validateValues,
  validateKeys,
  verifyMethod
}