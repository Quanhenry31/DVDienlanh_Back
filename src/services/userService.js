const {
  User,
  Addresses,
  userChats,
  Payment,
  Order,
  OrderDetail,
  Product,
  Category,
  ImgDetails,
  Size,
} = require("../models");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
// [POST] /
const create = async (payload) => {
  try {
    // Kiểm tra xem email đã tồn tại hay chưa
    const existingUser = await User.findOne({
      where: { email: payload.email },
    });
    if (existingUser) {
      return {
        code: -1,
        message: "Email đã tồn tại. Vui lòng sử dụng email khác.",
      };
    }

    // Tạo người dùng mới với thông tin payload
    const data = await User.create({ ...payload });

    return {
      code: 1,
      message: "Tài khoản đã được tạo thành công.",
      data,
    };
  } catch (err) {
    // Xử lý lỗi khác và trả về thông báo lỗi
    console.error(err);
    return {
      code: -2,
      message: "Đã xảy ra lỗi khi tạo tài khoản. Vui lòng thử lại sau.",
    };
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await User.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await User.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /
const search = async () => {
  try {
    const data = await User.findAll();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /:id
const searchId = async (id) => {
  try {
    const data = await User.findByPk(id, {
      attributes: ["id", "userName", "email", "phone", "address", "image"],
      include: [
        {
          model: Addresses,
        },
        {
          model: userChats,
        },
      ],
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
//[GET] list chat admin
const ListChatAdmin = async (id) => {
  try {
    const data = await User.findByPk(id, {
      attributes: ["id", "userName", "email", "phone", "address", "image"],
      include: [
        {
          model: Addresses,
        },
        {
          model: userChats,
        },
      ],
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /:id
const find = async (email) => {
  try {
    const data = await User.findOne({ where: { email: email }, raw: true });
    return data;
  } catch (err) {
    console.log(err);
  }
};
// [GET] /:id

const searchOrder = async (id) => {
  try {
    const data = await User.findByPk(id, {
      attributes: ["id", "userName", "email", "phone", "address"],
      include: [
        {
          model: Order,
          include: [
            {
              model: Payment,
            },
            {
              model: OrderDetail,
              include: [
                {
                  model: Product,
                  include: [
                    {
                      model: Category,
                    },
                    {
                      model: ImgDetails,
                    },
                    {
                      model: Size,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  create,
  update,
  destroy,
  search,
  searchId,
  find,
  searchOrder,
  ListChatAdmin,
};
