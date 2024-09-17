const { Product, User, Reply, Comments } = require("../models");

// [POST] /
const create = async (payload) => {
  try {
    const data = await Comments.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await Comments.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await Comments.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /
const search = async () => {
  try {
    const data = await Comments.findAll({
      include: [
        {
          model: Product,
        },
        {
          model: User,
        },
        {
          model: Reply,
          include: [{ model: User }],
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
    const data = await Comments.findByPk(id, {
      include: [
        {
          model: Product,
        },
        {
          model: User,
        },
        {
          model: Reply,
          include: [{ model: User }],
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
};
