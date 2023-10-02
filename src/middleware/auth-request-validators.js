const validateUserAuth = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Missing required fields: email and password",
    });
  }
  next();
};

module.exports = validateUserAuth;
