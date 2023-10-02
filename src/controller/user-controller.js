const userService = require("../services/user-service");

module.exports = {
  async create(req, res) {
    try {
      const user = await userService.create({
        email: req.body.email,
        password: req.body.password,
      });
      res.status(201).send(user);
    } catch (error) {
      console.log("Something went wrong: Controller: create", error);
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  },

  async login(req, res) {
    try {
      const { user, token } = await userService.login(
        req.body.email,
        req.body.password
      );
      res.status(200).send({ user, token });
    } catch (error) {
      console.log("Something went wrong: Controller: login", error);
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  },

  async get(req, res) {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      res.status(200).send(user);
    } catch (error) {
      console.log("Something went wrong: Controller: get", error);
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  },
  async delete(req, res) {
    try {
      const user = await userService.delete(req.params.id);
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      res.status(204).send(user);
    } catch (error) {
      console.log("Something went wrong: Controller: delete", error);
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  },

  async isAuthenticated(req, res) {
    try {
      const token = req.headers["x-access-token"];
      const response = await userService.isAuthenticated(token);
      console.log("response", response);
      res.status(200).send({ id: response });
    } catch (error) {
      console.log("Something went wrong: Controller: isAuthenticated", error);
      res.status(500).send({
        error,
        message: error.message,
      });
    }
  },
};
