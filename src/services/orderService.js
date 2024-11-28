const {
  Order,
  User,
  Payment,
  OrderDetail,
  Product,
  Category,
  ImgDetails,
  Brands,
} = require("../models");

// [POST] /
const create = async (payload) => {
  try {
    const data = await Order.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await Order.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await Order.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /
const search = async () => {
  try {
    const data = await Order.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Payment,
        },
      ],
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /:id
const searchId = async (id) => {
  try {
    const data = await Order.findByPk(id);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET]exportOrder
const searchOrder = async (id) => {
  try {
    const data = await Order.findAll({
      include: [
        {
          model: Payment,
        },
        {
          model: User,
          attributes: [
            "id",
            "userName",
            "email",
            "phone",
            "address",
            "image",
            "type",
          ],
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
                  model: Brands,
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
  searchOrder,
};
