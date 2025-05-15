// assets/js/faq.js
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        if (questionButton && answerDiv) {
            questionButton.addEventListener('click', () => {
                const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';
                questionButton.setAttribute('aria-expanded', !isExpanded);
                
                if (!isExpanded) {
                    // Para calcular a altura correta para a animação
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                } else {
                    answerDiv.style.maxHeight = null;
                }
            });
        }
    });
});