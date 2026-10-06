
const mongoose = require("mongoose");

const schema = new mongoose.Schema({

question:String,
option:String,

scores:{
subscription:Number,
affiliate:Number,
b2c:Number,
marketplace:Number,
dropshipping:Number,
b2b:Number
}

});

module.exports =
mongoose.model("ScoringRule",schema);