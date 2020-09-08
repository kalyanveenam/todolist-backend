const Mongoose = require("mongoose");
let response = require("../Libs/responseLib");
const listModel = Mongoose.model("list");
const userModel = Mongoose.model("users");

const multer = require("multer");
const path = require("path");

let createList = (req, res) => {

  new listModel(req.body).save((error, data) => {
    if (data) {
      let apiResponse = response.generate(false, null, 201, data);
      res.status(201).send(apiResponse);
    } else {
      let apiResponse = response.generate(true, error, 404, null);
      res.status(404).send(apiResponse);
    }
  });

};
let getAlllists = async (req, res) => {
  let user = await userModel.findById(req.user._id);


  await user.populate("userLists").execPopulate();
  let apiResponse = response.generate(false, null, 200, user.userLists);
  res.status(200).send(apiResponse);
};



module.exports = {
  createList: createList,
  getAlllists: getAlllists
};