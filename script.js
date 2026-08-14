// ===== Автоматический размер поля сообщения =====

const messageArea = document.getElementById('message');

messageArea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 2 + 'px';
});

// ===== Бургер-меню =====

const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

burgerBtn.addEventListener('click', function () {
    navMenu.classList.toggle('open');
});

const navLinks = navMenu.querySelectorAll('a');

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        navMenu.classList.remove('open');
    });
});
// ===== Красивая отправка формы без перезагрузки =====

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();  // отменяем обычную отправку с перезагрузкой

    const formData = new FormData(contactForm);  // собираем все поля формы

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
        if (response.ok) {
            contactForm.hidden = true;     // прячем форму
            formSuccess.hidden = false;    // показываем "Спасибо!"
            contactForm.reset();           // очищаем поля
        } else {
            alert('Что-то пошло не так. Попробуйте ещё раз!');
        }
    })
    .catch(function () {
        alert('Ошибка сети. Проверьте интернет и попробуйте ещё раз.');
    });
});