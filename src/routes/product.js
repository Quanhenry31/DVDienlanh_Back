const router = require("express").Router();
const Controller = require("../controllers/ProductController");

router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.get("/all", Controller.findAll);
router.get("/", Controller.findLoc);
router.get("/:id", Controller.findId);

module.exports = router;
