const Service = require("../services/userService");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class Controller {
  // [POST] /users
  // create = async (req, res) => {
  //   const data = await Service.create({
  //     ...req.body,
  //   });
  //   res.json(data);
  // };

  create = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = await Service.create({
      ...req.body,

      password: hashedPassword,
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [POST] /login
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(password);

      // Kiểm tra xem email và password có được cung cấp không
      if (!email || !password) {
        return res
          .status(400)
          .json({ code: -1, message: "Email and password are required" });
      }

      // Tìm người dùng theo email thông qua service
      const user = await Service.find(email);

      // Kiểm tra xem người dùng có tồn tại không
      if (!user) {
        return res.status(401).json({ code: -1, message: "No email existed" });
      }

      // Kiểm tra xem mật khẩu có tồn tại không
      if (!user.password) {
        return res
          .status(500)
          .json({ code: -1, message: "Password not available for user" });
      }

      // So sánh mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ code: -1, message: "Password not matched" });
      }

      delete user.password;

      // Tạo JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email }, // Sửa tên thành userName nếu cần
        "your_secret_key",
        { expiresIn: "1h" }
      );

      // Đặt token dưới dạng cookie
      res.cookie("token", token, { httpOnly: true }); // Bạn có thể đặt các tùy chọn bổ sung nếu cần

      res.json({ code: 0, message: "Login successful", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ code: -1, message: "Internal server error" });
    }
  };
  // currentUser
  current = async (req, res) => {
    const data = await Service.find(req.user.email);
    delete data.password;

    res.json(data);
  };
  // clear Token
  clearToken = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("http://localhost:3000/");
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  };

  // [PUT] /users/:id
  updatePassword = async (req, res) => {
    const hashedPassword = req.body.password
      ? await bcrypt.hash(req.body.password, 10)
      : undefined;
    const id = req.params.id;
    const data = await Service.update({
      data: {
        ...req.body,
        ...(hashedPassword && { password: hashedPassword }),
      },
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
  // [PUT] /users
  update = async (req, res) => {
    const id = req.params.id;
    const data = await Service.update(
      {
        ...req.body,
      },
      id
    );
    res.json(data);
  };
  // [DELETE] /users
  delete = async (req, res) => {
    const id = req.params.id;
    const data = await Service.destroy(id);
    res.json(data);
  };
  // [GET] /users/ALL
  findAll = async (req, res) => {
    const data = await Service.search();
    return res.json({
      data,
    });
  };

  // [GET] /users/id
  findId = async (req, res) => {
    const id = req.params.id;
    const data = await Service.searchId(id);
    return res.json({
      data,
    });
  };
  // [GET] /users/id
  findIdOrder = async (req, res) => {
    const id = req.params.id;
    const data = await Service.searchOrder(id);
    return res.json({
      data,
    });
  };
  // [GET] /listChatAdmin/id
  findListChatAdminIdOrder = async (req, res) => {
    const id = req.params.id;
    const data = await Service.ListChatAdmin(id);
    return res.json({
      data,
    });
  };
}

module.exports = new Controller();
