const express = require("express");
const app = express();
app.use(express.static("public"));
const port = 9000;
const { Sequelize } = require("sequelize");
const morgan = require("morgan");

const cors = require("cors");
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sequelize = new Sequelize("node_sendo", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

const connections = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connections();
app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
