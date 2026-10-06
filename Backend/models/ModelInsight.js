const mongoose = require("mongoose");

const modelInsightSchema = new mongoose.Schema({

model_name:{
type:String,
required:true
},

advantages:{
type:[String],
required:true
},

risks:{
type:[String],
required:true
},

cautions:{
type:[String],
required:true
},

recommendations:{
type:[String],
required:true
}

});

module.exports = mongoose.model(
"ModelInsight",
modelInsightSchema
);