

const mongoose = require("mongoose");

const schema = new mongoose.Schema({

name:String,
description:String,
advantages:[String],
risks:[String]

});

module.exports =
mongoose.model("BusinessModel",schema);