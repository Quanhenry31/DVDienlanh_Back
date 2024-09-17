const router = require("express").Router();
//au login
const passport = require("passport");
require("dotenv").config();
// au

const verifyToken = require("../../src/middlewares/verifyToken");

const Controller = require("../controllers/UserController");

// localhost:5000/api/users/auth/google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      console.log(profile);

      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(
      `${process.env.URL_CLIENT}/login-success/${req.user?.emails[0].value}/${req.user.tokenLogin}`
    );
  }
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { session: false, scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(
      `${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenLogin}`
    );
  }
);

router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.get("/", Controller.findAll);
router.get("/:id", Controller.findId);
router.post("/login-success", Controller.loginSuccess);
router.get("/get-one", verifyToken, Controller.getOne);

module.exports = router;
