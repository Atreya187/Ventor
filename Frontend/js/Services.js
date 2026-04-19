
// how it works
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.step-card');

  cards.forEach((card, index) => {
    // Initial styles
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    // Staggered entrance animation
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 150 * (index + 1));
  });
});


// footer
document.addEventListener('DOMContentLoaded', () => {
    // Detect if the text overflows and adjust spacing if necessary
    const footer = document.querySelector('.footer-distributed');
    
    const handleResize = () => {
        if (window.innerWidth < 1100 && window.innerWidth > 900) {
            footer.style.gap = '40px';
        } else if (window.innerWidth >= 1100) {
            footer.style.gap = '80px';
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
});

document.addEventListener('DOMContentLoaded', function() {
    const accordionBtns = document.querySelectorAll(".faq-question");

    accordionBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const faqItem = this.parentElement;
            const isOpen = faqItem.classList.contains("active");

            // Close all other items first
            document.querySelectorAll(".faq-item").forEach((item) => {
                item.classList.remove("active");
                item.querySelector(".faq-answer").style.maxHeight = null;
            });

            // If it wasn't open, open it
            if (!isOpen) {
                faqItem.classList.add("active");
                const answer = faqItem.querySelector(".faq-answer");
                // Set height to the exact scrollHeight of the content
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});














// how it works
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.step-card');

  cards.forEach((card, index) => {
    // Initial styles
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    // Staggered entrance animation
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 150 * (index + 1));
  });
});














// assement


// Assessment Logic
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startAssessmentBtn');
    const emptyState = document.getElementById('emptyState');
    const reportsList = document.getElementById('reportsList');

    let reports = [];

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const date = new Date().toLocaleDateString();
            const reportId = reports.length + 1;
            
            reports.push({
                id: reportId,
                title: `Startup Strategy Analysis #${reportId}`,
                date: date
            });

            updateDisplay();
        });
    }

    function updateDisplay() {
        if (reports.length > 0) {
            emptyState.classList.add('hidden');
            reportsList.classList.remove('hidden');

            reportsList.innerHTML = reports.map(r => `
                <li class="report-item">
                    <div class="report-info">
                        <h4 class="report-title">${r.title}</h4>
                        <span class="report-date">Generated: ${r.date}</span>
                    </div>
                    <button class="signup-btn view-report-btn">View Full Report</button>
                </li>
            `).join('');
        }
    }
});