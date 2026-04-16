function calculateTraffic() {

    let goal = parseFloat(document.getElementById("goal").value);
    let days = parseFloat(document.getElementById("days").value);

    if (isNaN(goal) || isNaN(days) || days <= 0) {
        alert("Please enter valid numbers");
        return;
    }

    let dailyRevenue = goal / days;

    // Assume average conversion:
    // 2% conversion rate
    // ₹1000 average order value

    let conversionRate = 0.02;
    let avgOrderValue = 1000;

    let dailyOrdersNeeded = dailyRevenue / avgOrderValue;
    let visitorsNeeded = dailyOrdersNeeded / conversionRate;

    document.getElementById("dailyRevenue").innerText = dailyRevenue.toFixed(2);
    document.getElementById("visitors").innerText = Math.ceil(visitorsNeeded);
}