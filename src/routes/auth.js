const router = require("express").Router();
const passport = require("passport");
const { User } = require("../models");

require("dotenv").config();

router.get("/login/success", async (req, res) => {
  console.log(req.user); // Kiểm tra giá trị của req.user
  if (req.user) {
    try {
      // Lấy email từ req.user
      const email = req.user.emails[0].value;

      const updateData = {
        userName: req.user.displayName || "",
        image: req.user.photos[0].value || "",
        type: req.user.provider || "",
      };

      const updatedUser = await User.update(updateData, {
        where: { email: email },
      });
      // Tìm người dùng trong cơ sở dữ liệu bằng email
      const userInDb = await User.findOne({
        where: { email: email },
        attributes: { exclude: ["password"] },
      });

      if (userInDb) {
        // Nếu tìm thấy người dùng, trả về thông tin từ cơ sở dữ liệu
        res.status(200).json({
          error: false,
          message: "Successfully Logged In",
          user: userInDb, // Trả về dữ liệu người dùng từ cơ sở dữ liệu
        });
      } else {
        // Nếu không tìm thấy người dùng trong cơ sở dữ liệu
        res.status(404).json({
          error: true,
          message: "User not found in the database",
        });
      }
    } catch (error) {
      console.error("Error finding user in database:", error);
      res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  } else {
    // Nếu không có req.user
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  res.clearCookie("session");
  // req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
