const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let subtask = new mySchema({
  description: String
})

let taskdata = new mySchema({
  title: String,
  description: String,
  subtask: [subtask]
});

let listSchema = new mySchema({
  title: {
    type: String,
    require: true,
  },

  tasks: [taskdata],

  owner: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "users",
  }
});
module.exports = mongoose.model("list", listSchema);