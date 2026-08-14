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