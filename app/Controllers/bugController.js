const Mongoose = require("mongoose");
let response = require("../Libs/responseLib");
const listModel = Mongoose.model("list");
const userModel = Mongoose.model("users");

const multer = require("multer");
const path = require("path");
const attachments = require("../models/attachments");
const {
  title
} = require("process");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../attachments/"));
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let createBug = (req, res) => {
  console.log(req.body.tasks[0].subtask[0].description)
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      item = req.body[key];
      console.log(item);
    }
  }
  const createList = new listModel(req.body).save((error, data) => {
    if (data) {
      let apiResponse = response.generate(false, null, 201, data);
      res.status(201).send(apiResponse);
    } else {
      let apiResponse = response.generate(true, error, 404, null);
      res.status(404).send(apiResponse);
    }
  });
};



module.exports = {
  createBug: createList,

};