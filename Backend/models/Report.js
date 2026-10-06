
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

company_name:String,
founder_name:String,
industry:String,

investment:Number,
profit_margin:Number,
expected_customers:Number,
avg_price:Number,

scores:Object,

recommended_model:String,

monthly_revenue:Number,
yearly_revenue:Number,

created_at:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Report",reportSchema);