
let chartInstance;

/* FORM SUBMIT */

document.getElementById("startupForm")
.addEventListener("submit", async function(e){

e.preventDefault();

/* SHOW LOADING SCREEN */

document.getElementById("loadingScreen").style.display = "flex";

/* DYNAMIC LOADING MESSAGES */

const messages = [
"Analyzing revenue strategy...",
"Evaluating market approach...",
"Calculating business compatibility...",
"Generating startup insights...",
"Preparing your business model report..."
];

let msgIndex = 0;

const loadingInterval = setInterval(()=>{

document.getElementById("loadingText").innerText =
messages[msgIndex];

msgIndex = (msgIndex + 1) % messages.length;

},1500);

/* GET FORM DATA */

const formData = new FormData(this);
const data = Object.fromEntries(formData.entries());

/* SEND DATA TO BACKEND */

const response = await fetch(
"http://localhost:5000/api/generate-report",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

const result = await response.json();

/* STOP LOADING SCREEN */

clearInterval(loadingInterval);
document.getElementById("loadingScreen").style.display = "none";

/* HIDE FORM */

document.querySelector("#startupForm").style.display="none";

/* SHOW REPORT */

document.getElementById("reportSection").style.display="block";

/* COMPANY INFO */

document.getElementById("companyInfo").innerHTML = `
<p><b>Company:</b> ${data.company_name}</p>
<p><b>Founder:</b> ${data.founder_name}</p>
<p><b>Industry:</b> ${data.industry}</p>
<p><b>Investment:</b> ₹${data.investment}</p>
<p><b>Profit Margin:</b> ${data.profit_margin}%</p>
<p><b>Expected Customers:</b> ${data.expected_customers}</p>
<p><b>Average Price:</b> ₹${data.avg_price}</p>
`;

/* RECOMMENDED MODEL */

document.getElementById("recommendedModel").innerHTML =
`Recommended Model: ${result.recommended_model}`;

/* AI BUSINESS INSIGHT */

let insight = "";

if(result.recommended_model === "b2c"){
insight =
"Your startup shows strong compatibility with the B2C model because you plan to sell your own product, target consumers, and focus on brand building. This model allows you to build a direct relationship with customers and scale through digital marketing.";
}

else if(result.recommended_model === "subscription"){
insight =
"The system recommends the Subscription model because your business prefers recurring revenue and long-term customer relationships. Subscription models provide predictable income and strong customer retention.";
}

else if(result.recommended_model === "affiliate"){
insight =
"The Affiliate model is recommended because your business prefers simple operations and commission-based revenue. This model allows you to earn income by promoting products without managing inventory.";
}

else if(result.recommended_model === "dropshipping"){
insight =
"Dropshipping is suitable for your startup because you are comfortable relying on suppliers for product fulfillment. This reduces inventory costs and allows you to focus on marketing and customer acquisition.";
}

else if(result.recommended_model === "marketplace"){
insight =
"The Marketplace model fits your strategy because you are interested in building a platform connecting buyers and sellers. This model scales by increasing both vendors and customers.";
}

else if(result.recommended_model === "b2b"){
insight =
"The B2B model is recommended because your target customers are businesses and your operations support bulk transactions. This model often produces higher order values and long-term contracts.";
}

document.getElementById("aiInsightText").innerText = insight;

/* ADVANTAGES */

document.getElementById("advantages").innerHTML =
result.advantages.map(a=>`<li>${a}</li>`).join("");

/* RISKS */

document.getElementById("risks").innerHTML =
result.risks.map(r=>`<li>${r}</li>`).join("");

/* RECOMMENDATIONS */

document.getElementById("recommendations").innerHTML =
result.recommendations.map(r=>`<li>${r}</li>`).join("");

/* MODEL EXPLANATION ENGINE */

const explanation = [];

if(data.revenue_strategy === "Recurring monthly payments"){
explanation.push("You prefer recurring revenue which supports subscription based businesses.");
}

if(data.product_ownership === "Yes"){
explanation.push("You plan to sell your own product which fits direct selling models like B2C.");
}

if(data.inventory_management === "Yes"){
explanation.push("Your business can manage inventory which enables product-based ecommerce models.");
}

if(data.target_customer === "Individual consumers"){
explanation.push("Your target audience is individual consumers which supports B2C and subscription models.");
}

if(data.target_customer === "Businesses"){
explanation.push("Your target customers are businesses which aligns with B2B business models.");
}

if(data.supplier_dependence === "Yes"){
explanation.push("You are comfortable relying on suppliers which makes dropshipping feasible.");
}

if(data.platform_strategy === "Yes"){
explanation.push("You want to build a platform connecting buyers and sellers which supports marketplace models.");
}

if(data.customer_relationship === "Yes"){
explanation.push("You prefer long-term customer relationships which aligns with subscription models.");
}

if(data.operations_complexity === "Very simple"){
explanation.push("You prefer simple operations which fits affiliate or dropshipping businesses.");
}

if(data.marketing_strategy === "Brand building"){
explanation.push("Your focus on brand building supports direct-to-consumer ecommerce models.");
}

if(data.delivery_type === "Supplier ships directly"){
explanation.push("Your delivery model relies on suppliers which aligns with dropshipping.");
}

document.getElementById("modelExplanation").innerHTML =
explanation.map(e=>`<li>${e}</li>`).join("");

/* MODEL COMPARISON TABLE */

const tableBody = document.getElementById("modelTableBody");

tableBody.innerHTML = "";

const totalScore = Object.values(result.scores)
.reduce((a,b)=>a+b,0);

const highestMatch = Object.entries(result.scores).reduce((best,[model,score]) => {
  if (best[1] === null || score > best[1]) {
    return [model, score];
  }
  return best;
}, [null, null]);

Object.entries(result.scores).forEach(([model,score])=>{

const percent = totalScore > 0 ? ((score/totalScore)*100).toFixed(1) : "0.0";

const row = document.createElement("tr");

if(model === result.recommended_model){
row.classList.add("best-model");
}

row.innerHTML = `
<td>${model.toUpperCase()}</td>
<td>${percent}%</td>
`;

tableBody.appendChild(row);

});

if (highestMatch[0]) {
  const highestModelName = highestMatch[0].toUpperCase();
  const highestPercent = totalScore > 0 ? ((highestMatch[1] / totalScore) * 100).toFixed(1) : "0.0";
  document.getElementById("topMatch").innerText = `Top matched model: ${highestModelName} (${highestPercent}%)`;
} else {
  document.getElementById("topMatch").innerText = "Top matched model: N/A";
}

/* REVENUE */

document.getElementById("monthlyRevenue").innerHTML =
`Monthly Revenue: ₹${result.monthlyRevenue}`;

document.getElementById("yearlyRevenue").innerHTML =
`Yearly Revenue: ₹${result.yearlyRevenue}`;

/* PIE CHART */

if(chartInstance){
chartInstance.destroy();
}

const ctx = document
.getElementById("scoreChart")
.getContext("2d");

const total = Object.values(result.scores)
.reduce((a,b)=>a+b,0);

const percentages =
Object.values(result.scores)
.map(v => ((v/total)*100).toFixed(1));

chartInstance = new Chart(ctx,{
type:"pie",
data:{
labels:Object.keys(result.scores)
.map((m,i)=>`${m} (${percentages[i]}%)`),
datasets:[{
data:Object.values(result.scores),
backgroundColor:[
"#4f46e5",
"#06b6d4",
"#10b981",
"#f59e0b",
"#ef4444",
"#8b5cf6"
],
borderColor:"#ffffff",
borderWidth:3
}]
}
});

/* REVENUE BAR CHART */

const revenueCtx = document
.getElementById("revenueChart")
.getContext("2d");

new Chart(revenueCtx,{
type:"bar",
data:{
labels:["Monthly Revenue","Yearly Revenue"],
datasets:[{
label:"Revenue Projection",
data:[
result.monthlyRevenue,
result.yearlyRevenue
],
backgroundColor:[
"#10b981",
"#4f46e5"
]
}]
},
options:{
responsive:true,
plugins:{
legend:{
display:false
}
}
}
});

/* CAUTIONS */
document.getElementById("cautions").innerHTML =
result.cautions.map(c=>`<li>${c}</li>`).join("");

/* SUCCESS SCORE */

const maxScore = Math.max(...Object.values(result.scores));

const successPercent =
((maxScore / totalScore) * 100).toFixed(1);

document.getElementById("successScore").innerText =
successPercent + "%";

document.getElementById("scoreFill").style.width =
successPercent + "%";

});

/* DELETE REPORT */

document.getElementById("deleteBtn")
.addEventListener("click",function(){
location.reload();
});

/* DOWNLOAD REPORT */

document.getElementById("downloadBtn").addEventListener("click", async () => {

const report = document.getElementById("reportSection");

/* Save old styles */

const oldBodyDisplay = document.body.style.display;
const oldBodyAlign = document.body.style.alignItems;
const oldBodyJustify = document.body.style.justifyContent;

/* Reset body layout so PDF starts from top */

document.body.style.display = "block";
document.body.style.alignItems = "normal";
document.body.style.justifyContent = "normal";

/* Scroll to top */

window.scrollTo(0,0);

/* Wait for layout to stabilize */

await new Promise(resolve => setTimeout(resolve,500));

/* Generate PDF */

await html2pdf().set({

margin:10,
filename:"startup-report.pdf",

html2canvas:{
scale:2,
useCORS:true,
scrollY:0
},

jsPDF:{
unit:"mm",
format:"a4",
orientation:"portrait"
}

}).from(report).save();

/* Restore layout */

document.body.style.display = oldBodyDisplay;
document.body.style.alignItems = oldBodyAlign;
document.body.style.justifyContent = oldBodyJustify;

});

