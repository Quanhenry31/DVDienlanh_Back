const Service = require("../services/servicesTimeUsuallyServices");
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
}

module.exports = new Controller();
