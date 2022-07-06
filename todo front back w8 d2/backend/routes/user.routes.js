const { Router } = require("express");
const { userController } = require("../controllers/user.controller");

const router = Router();

router.post("/users", userController.createUser);
router.delete("/users/:id", userController.delUser);
router.get("/users", userController.getUsers);
router.post("/login", userController.logIn);

module.exports = router;
