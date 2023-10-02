const express = require("express");
const router = express.Router();

const userController = require("../../controller/user-controller");

router.post("/signup", userController.create);
router.get("/users/:id", userController.get);
router.delete("/users/:id", userController.delete);

module.exports = router;
