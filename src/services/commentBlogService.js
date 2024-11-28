const { Blogs, User, commentBlogs } = require("../models");

// [POST] /
const create = async (payload) => {
  try {
    const data = await commentBlogs.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await commentBlogs.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await commentBlogs.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /
const search = async () => {
  try {
    const data = await commentBlogs.findAll({
      include: [
        {
          model: Blogs,
        },
        {
          model: User,
          attributes: ["id", "userName", "createdAt"],
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
    const data = await commentBlogs.findByPk(id, {
      include: [
        {
          model: Blogs,
        },
        {
          model: User,
          attributes: { exclude: ["password"] },
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
