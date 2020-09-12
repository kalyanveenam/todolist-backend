const Mongoose = require("mongoose");
let response = require("../Libs/responseLib");
const listModel = Mongoose.model("list");
const userModel = Mongoose.model("users");
const friendModel=Mongoose.model('friends')
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
let sendRequest = (req, res) => {

  new friendModel({
    fromUser: req.user._id,
    toUser:req.body.to,
    status: req.body.status,
    recieverName:req.body.recieverName,
    senderName:req.user.name
  }).save((error, data) => {
    if (data) {
      let apiResponse = response.generate(false, null, 201, data);
      res.status(201).send(apiResponse);
    } else {
      let apiResponse = response.generate(true, error, 404, null);
      res.status(404).send(apiResponse);
    }
  });

};
let updateRequest = (req, res) => {

    
}
let getFriendRequests = async (req, res) => {
  let friendlist = await friendModel.find({ $or:[{fromUser: req.user._id}, {toUser: req.user._id}],status: req.query.status} )
   let apiResponse = response.generate(false, null, 200, user);
  res.status(200).send(apiResponse);

//   let user = await userModel.findById(req.user._id);
//  console.log(user)
//   await user.populate("friendRequests").execPopulate();
//   let apiResponse = response.generate(false, null, 200, user.friendRequests);
//    res.status(200).send(apiResponse);


};



module.exports = {
  createList: createList,
  getAlllists: getAlllists,
  sendRequest:sendRequest,
  getFriendRequests:getFriendRequests
};