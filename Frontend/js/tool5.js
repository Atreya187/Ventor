function calculate(){

let marketingCost = Number(document.getElementById("marketingCost").value);
let customers = Number(document.getElementById("customers").value);

let avgPurchase = Number(document.getElementById("avgPurchase").value);
let frequency = Number(document.getElementById("frequency").value);
let lifespan = Number(document.getElementById("lifespan").value);

if(!marketingCost || !customers || !avgPurchase || !frequency || !lifespan){
alert("Please fill all fields");
return;
}

let cac = marketingCost / customers;
let ltv = avgPurchase * frequency * lifespan;

document.getElementById("cacResult").innerText = "CAC: ₹ " + cac.toFixed(2);
document.getElementById("ltvResult").innerText = "LTV: ₹ " + ltv.toFixed(2);

if(ltv > cac){
document.getElementById("comparison").innerText =
"Congratulations! Your LTV > CAC. Your business model looks profitable.";
}
else{
document.getElementById("comparison").innerText =
"You need to improve your LTV. It should always be higher than CAC.";
}

}