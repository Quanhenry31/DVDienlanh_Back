const { User, Addresses, userChats } = require("../models");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
// [POST] /
const create = async (payload) => {
  try {
    const data = await User.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
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
      attributes: ["id", "userName", "email", "phone", "address"],
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

module.exports = {
  create,
  update,
  destroy,
  search,
  searchId,
};
