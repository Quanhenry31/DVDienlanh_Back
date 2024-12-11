const db = require("../src/models");
// const uploadImage = require("./uploadImage");
const express = require("express");
const axios = require("axios");
const app = express();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
app.use(express.static("public"));
const port = 9000;
const { Sequelize } = require("sequelize");
const morgan = require("morgan");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// cloudinary
const cloudinary = require("cloudinary").v2;
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

// cloudinary

const cors = require("cors");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"], // Thay đổi key nếu cần
    maxAge: 24 * 60 * 60 * 1000, // 24 giờ
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:9000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      // them user vaof dbsds
      try {
        if (profile?.id) {
          let response = await db.User.findOrCreate({
            where: { email: profile.emails[0]?.value },
            defaults: {
              email: profile.emails[0]?.value,
              userName: profile?.displayName,
              type: profile?.provider,
              name: profile?.displayName,
              image: profile?.photos[0]?.value,
              role: 2,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
      // console.log(profile);
      return callback(null, profile);
    }
  )
);

app.use(morgan("dev"));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
const sequelize = new Sequelize("node_sendo", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

// cloudinary
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.post("/uploadMultipleImages", (req, res) => {
  uploadImage
    .uploadMultipleImages(req.body.images)
    .then((urls) => res.send(urls))
    .catch((err) => res.status(500).send(err));
});

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};
module.exports = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

module.exports.uploadMultipleImages = (images) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => uploadImage(base));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};
// cloudinary

app.get("/api/provinces", async (req, res) => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    );
    res.json(response.data);
  } catch (error) {
    // console.error("Error fetching provinces:", error);
    res.status(500).send("Lỗi khi lấy dữ liệu tỉnh thành.");
  }
});
// // Endpoint để lấy danh sách huyện
// app.get("/api/tinh/:code", async (req, res) => {
//   const { code } = req.params; // Lấy mã tỉnh từ URL
//   try {
//     const response = await axios.get(
//       `https://provinces.open-api.vn/api/p/${code}?depth=2`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send("Lỗi khi lấy dữ liệu huyện và xã.");
//   }
// });
// // Endpoint để lấy danh sách xã
// app.get("/api/xa/:code", async (req, res) => {
//   const { code } = req.params; // Lấy mã tỉnh từ URL
//   try {
//     const response = await axios.get(
//       `https://provinces.open-api.vn/api/d/${code}?depth=2`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send("Lỗi khi lấy dữ liệu huyện và xã.");
//   }
// });
const connections = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connections();
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/api", require("./routes"));
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Susses" });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
