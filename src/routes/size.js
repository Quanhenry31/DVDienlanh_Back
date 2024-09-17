const router = require("express").Router();
const Controller = require("../controllers/SizeController");

router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.get("/all", Controller.findAll);
router.get("/:id", Controller.findId);
router.get("/", Controller.findLoc);

module.exports = router;
