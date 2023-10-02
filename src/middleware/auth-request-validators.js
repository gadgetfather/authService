const validateUserAuth = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Missing required fields: email and password",
    });
  }
  next();
};
const validateIsAdminUserRequest = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "Missing required field: userId",
    });
  }
  next();
};
module.exports = { validateUserAuth, validateIsAdminUserRequest };
