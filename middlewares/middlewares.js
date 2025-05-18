const createId = (req, res, next) => {
  req.body.id = `item-${Math.floor(Math.random() * 10000)}`;
  next();
};

const validateKeys = (req, res, next) => {
  for (const [key, value] of Object.entries(req.body)) {
    if (!value) {
      console.log(value);
      return res.status(400).json({
        status: "Failed",
        data: "Please inform all required keys",
      });
    }
  }
  next();
};

module.exports = {
    createId,
    validateKeys
}