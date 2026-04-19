
const ScoringRule = require("../models/ScoringRule");
const ModelInsight = require("../models/ModelInsight");
const Report = require("../models/Report");

exports.generateReport = async (req, res) => {

const answers = req.body;

/* INITIAL SCORES */

let scores = {
subscription:0,
affiliate:0,
b2c:0,
marketplace:0,
dropshipping:0,
b2b:0
};

/* GET RULES FROM DATABASE */

const rules = await ScoringRule.find();
// temporary
console.log("Rules found in DB:", rules.length); // If this is 0, your database is empty.
/* CALCULATE SCORES */

rules.forEach(rule => {

if(answers[rule.question] === rule.option){

scores.subscription += rule.scores.subscription;
scores.affiliate += rule.scores.affiliate;
scores.b2c += rule.scores.b2c;
scores.marketplace += rule.scores.marketplace;
scores.dropshipping += rule.scores.dropshipping;
scores.b2b += rule.scores.b2b;

}

});

/* FIND BEST MODEL */

const bestModel =
Object.keys(scores).reduce((a,b)=>
scores[a] > scores[b] ? a : b
);

/* CALCULATE REVENUE */

const monthlyRevenue =
answers.expected_customers *
answers.avg_price *
(answers.profit_margin/100);

const yearlyRevenue =
monthlyRevenue * 12;

/* FETCH MODEL INSIGHTS */

const modelMap = {
subscription: "Subscription",
affiliate: "Affiliate",
b2c: "B2C",
marketplace: "Marketplace",
dropshipping: "Dropshipping",
b2b: "B2B"
};

const insight = await ModelInsight.findOne({
model_name: modelMap[bestModel]
});
// temporary
console.log("Searching for model:", modelMap[bestModel]);
console.log("Insight found:", insight); // If this is null, your 'model_name' in DB doesn't match the map.
/* SAVE REPORT */

const report = new Report({

...answers,
scores,
recommended_model: bestModel,
monthly_revenue: monthlyRevenue,
yearly_revenue: yearlyRevenue

});

await report.save();

/* SEND RESPONSE */

res.json({

recommended_model: bestModel,
scores,
monthlyRevenue,
yearlyRevenue,

advantages: insight ? insight.advantages : [],
risks: insight ? insight.risks : [],
cautions: insight ? insight.cautions : [],
recommendations: insight ? insight.recommendations : []

});

};