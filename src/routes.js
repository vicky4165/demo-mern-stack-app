const router = require("express").Router();
const Controller = require("./controller");

router.get("/", Controller.getTodos);
router.get("/:id", Controller.getTodo);
router.put("/:id", Controller.updateTodo);
router.delete("/:id", Controller.deleteTodo);
router.post("/", Controller.saveTodo);

module.exports = router;