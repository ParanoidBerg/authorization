const { Router } = require("express");
const { todoController } = require("../controllers/todo.controller");
const authMiddlewares = require("../models/middlewares/auth.middlewares");

const router = Router();

router.post("/todos", authMiddlewares, todoController.postTodo);
router.delete("/todos/:id", authMiddlewares, todoController.delTodo);
router.get("/todos", authMiddlewares, todoController.getTodo);
router.patch("/todos/:id", todoController.patchTodo);

module.exports = router;
