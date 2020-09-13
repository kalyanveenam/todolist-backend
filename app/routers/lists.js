const apiConfig = require("../config/appConfig");
let auth = require("../Middlewares/authVerify");
let bugController = require("../Controllers/bugController");
let multer = require("multer");
let upload = multer();

const listRoutes = (app) => {



  app.post(
    apiConfig.config.apiVersion + "/create/list",
    auth.authValidation,
    bugController.createList
  );
  app.get(
    apiConfig.config.apiVersion + "/get/list", auth.authValidation,
    bugController.getAlllists
  )
  app.get(
    apiConfig.config.apiVersion + "/get/listbyid", auth.authValidation,
    bugController.getListsById
  )
  app.post(
    apiConfig.config.apiVersion+"/send/request",
    auth.authValidation,
    bugController.sendRequest
  )
  app.get(
    apiConfig.config.apiVersion+"/list/friends",
    auth.authValidation,
    bugController.getFriendRequests
    
  )
app.put(
  apiConfig.config.apiVersion+"/update/list",
  auth.authValidation,
  bugController.updateList

)
app.put(
  apiConfig.config.apiVersion+"/update/status",
  auth.authValidation,
  bugController.updateFriendRequest
)
app.get(
  apiConfig.config.apiVersion+"/friends/accepted",
  auth.authValidation,
  bugController.getAcceptedFriendRequests
  
)



};
module.exports = {
  listRoutes: listRoutes
};