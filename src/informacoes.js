document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(button => {
        button.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            answer.classList.toggle("open");
        });
    });
});
