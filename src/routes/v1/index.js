const express = require("express");
const router = express.Router();
const { authRequestValidators } = require("../../middleware/index");
const userController = require("../../controller/user-controller");

router.post("/signup", authRequestValidators, userController.create);
router.get("/users/:id", userController.get);
router.delete("/users/:id", userController.delete);
router.post("/login", userController.login);
router.get("/isAuthenticated", userController.isAuthenticated);

module.exports = router;
