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

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            const icon = hamburger.querySelector('i');
            // Toggle between bars and X icon
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }
});