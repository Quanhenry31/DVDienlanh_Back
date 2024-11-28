const router = require("express").Router();
const Controller = require("../controllers/UserController");

const { verifyUser } = require("../middlewares/authMiddleware");

router.get("/currentUser", verifyUser, Controller.current);
router.post("/", Controller.create);
router.get("/logout", verifyUser, Controller.clearToken);
router.put("updatePassword/:id", verifyUser, Controller.updatePassword);
router.put("/:id", Controller.update);
router.delete("/:id", verifyUser, Controller.delete);
router.get("/", Controller.findAll);
router.get("/:id", Controller.findId);
router.get("/listChatAd/:id", Controller.findListChatAdminIdOrder);
router.get("/order/:id", Controller.findIdOrder);

router.post("/login", Controller.login);

module.exports = router;
