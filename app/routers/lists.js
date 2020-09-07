const apiConfig = require("../config/appConfig");
let auth = require("../Middlewares/authVerify");
let bugController = require("../Controllers/bugController");
var multer = require("multer");
var upload = multer();

const listRoutes = (app) => {



  app.post(
    apiConfig.config.apiVersion + "/create/list",

    bugController.createList
  );


};
module.exports = {
  listRoutes: listRoutes
};