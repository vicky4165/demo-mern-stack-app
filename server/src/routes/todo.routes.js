const router = require("express").Router();
const Controller = require("../controllers/todo.controller");
const { checkUserAuth, checkReqMethod, uploadFile } = require('../middlewares');

router.get("/", checkReqMethod, checkUserAuth('admin'), Controller.getTodos);
router.get("/:id", Controller.getTodo);
router.put("/:id", Controller.updateTodo);
router.delete("/:id", Controller.deleteTodo);
router.post("/", Controller.saveTodo);

module.exports = router;