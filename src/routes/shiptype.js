const router = require("express").Router();
const Controller = require("../controllers/ShiptypeController");

router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.get("/", Controller.findAll);
router.get("/:id", Controller.findId);

module.exports = router;
