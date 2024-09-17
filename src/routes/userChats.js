const router = require("express").Router();
const Controller = require("../controllers/UserChatsController");

router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.get("/", Controller.findAll);
router.get("/:id", Controller.findId);
router.get("/:userChatID/:adminChatID", Controller.findLoc);

module.exports = router;
