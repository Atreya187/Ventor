function calculateBreakEven(){

let investment = document.getElementById("investment").value;
let profit = document.getElementById("profit").value;

investment = Number(investment);
profit = Number(profit);

if(profit <= 0){
document.getElementById("result").innerText =
"Monthly profit must be greater than 0";
return;
}

let months = investment / profit;

months = Math.ceil(months);

document.getElementById("result").innerText =
"Break-even period: " + months + " months";

}