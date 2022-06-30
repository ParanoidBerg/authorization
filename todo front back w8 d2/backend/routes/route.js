const { Router } = require("express");
const { todoController } = require("../controllers/controller");

const router = Router();

router.post("/todos", todoController.postTodo);
router.delete("/todos/:id", todoController.delTodo);
router.get("/todos", todoController.getTodo);
router.patch("/todos/:id", todoController.patchTodo);

module.exports = router;
