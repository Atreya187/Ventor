function calculateROI(){

let investment = Number(document.getElementById("investment").value);
let profit = Number(document.getElementById("profit").value);

let roi = (profit / investment) * 100;

document.getElementById("roiResult").innerText =
"ROI: " + roi.toFixed(2) + "%";

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