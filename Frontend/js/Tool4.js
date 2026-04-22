function calculateROI(){

let investment = Number(document.getElementById("investment").value);
let profit = Number(document.getElementById("profit").value);

let roi = (profit / investment) * 100;

document.getElementById("roiResult").innerText =
"ROI: " + roi.toFixed(2) + "%";

}