const Service = require("../services/userChatsService");
const { Op } = require("sequelize");

class Controller {
  // [POST] /users
  create = async (req, res) => {
    const data = await Service.create({
      ...req.body,
    });
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
  findLoc = async (req, res) => {
    const userChatID = req.params.userChatID;
    const adminChatID = req.params.adminChatID;
    const data = await Service.searchLoc(userChatID, adminChatID);
    return res.json({
      data,
    });
  };
  // [get] /:all find new time and one userChatID
  findUserChat = async (req, res) => {
    try {
      const data = await Service.listUserChats();
      return res.json({
        data,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching user chats" });
    }
  };
}

module.exports = new Controller();
