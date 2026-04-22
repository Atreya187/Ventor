function calculateProfit() {

    let cost = parseFloat(document.getElementById("cost").value);
    let margin = parseFloat(document.getElementById("margin").value);

    if (isNaN(cost) || isNaN(margin)) {
        alert("Please enter valid numbers");
        return;
    }

    let profitAmount = (cost * margin) / 100;
    let sellingPrice = cost + profitAmount;

    document.getElementById("profit").innerText = profitAmount.toFixed(2);
    document.getElementById("revenue").innerText = sellingPrice.toFixed(2);
}