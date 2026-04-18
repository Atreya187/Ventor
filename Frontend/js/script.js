// dark mode
// At the very top of script.js
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    }
})();

let slideIndex = 1;
let autoTimer;

showSlides(slideIndex);
startAutoSlide();

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimer();
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";  
}

function startAutoSlide() {
    autoTimer = setInterval(function() {
        plusSlides(1);
    }, 10000); // 10 seconds
}

function resetTimer() {
    clearInterval(autoTimer);
    startAutoSlide();
}












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

// faq section

function toggleFaq(button) {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const isOpen = faqItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isOpen) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
}

// FAQ Accordion Logic
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items (optional - remove if you want multiple open)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle current item
            if (!isOpen) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});




// Universal Dark Mode Logic (Safe for all pages)
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const savedTheme = localStorage.getItem('theme');

    // 1. Check LocalStorage on every page load
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // 2. Button Logic (Only runs on the page where the button exists)
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        
        // Set correct icon state on load
        if (savedTheme === 'dark' && icon) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (icon) icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                if (icon) icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
});