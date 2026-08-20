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