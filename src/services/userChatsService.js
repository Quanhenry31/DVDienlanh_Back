const { userChats, User } = require("../models");

// [POST] /
const create = async (payload) => {
  try {
    const data = await userChats.create({ ...payload });
    console.log(payload);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [PUT] /:id
const update = async (payload, id) => {
  try {
    const data = await userChats.update({ ...payload }, { where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [DELETE] /delete
const destroy = async (id) => {
  try {
    const data = await userChats.destroy({ where: { id } });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// [GET] /
const search = async () => {
  try {
    const data = await userChats.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "userName"],
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
    const data = await userChats.findByPk(id);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const searchLoc = async (userChatID, adminChatID) => {
  try {
    const data = await userChats.findAll({
      where: {
        userChatID: userChatID,
        adminChatID: adminChatID,
      },
      include: [
        {
          model: User,
          attributes: ["id", "userName"],
        },
      ],
    });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch data");
  }
};

module.exports = {
  create,
  update,
  destroy,
  search,
  searchId,
  searchLoc,
};
