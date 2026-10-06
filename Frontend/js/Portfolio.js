

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



// faq section

// FAQ Accordion Logic
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

