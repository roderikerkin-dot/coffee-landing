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
    event.preventDefault();

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
        if (response.ok) {
            contactForm.hidden = true;
            formSuccess.hidden = false;
            contactForm.reset();
        } else {
            alert('Что-то пошло не так. Попробуйте ещё раз!');
        }
    })
    .catch(function () {
        alert('Ошибка сети. Проверьте интернет и попробуйте ещё раз.');
    });
});

// ===== Маска для телефона =====

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function () {
    let digits = this.value.replace(/\D/g, '');

    if (digits.startsWith('8')) {
        digits = '7' + digits.slice(1);
    }

    if (!digits.startsWith('7') && digits.length > 0) {
        digits = '7' + digits;
    }

    digits = digits.slice(0, 11);

    let formatted = '+7';
    if (digits.length > 1) {
        formatted += ' (' + digits.slice(1, 4);
    }
    if (digits.length >= 5) {
        formatted += ') ' + digits.slice(4, 7);
    }
    if (digits.length >= 8) {
        formatted += '-' + digits.slice(7, 9);
    }
    if (digits.length >= 10) {
        formatted += '-' + digits.slice(9, 11);
    }

    this.value = formatted;
});

phoneInput.addEventListener('focus', function () {
    if (this.value === '') {
        this.value = '+7 (';
    }
});

phoneInput.addEventListener('blur', function () {
    if (this.value === '+7 (' || this.value === '+7') {
        this.value = '';
    }
});

// ===== Статус "Открыто/Закрыто" =====

const openStatus = document.getElementById('openStatus');
const currentHour = new Date().getHours();
const isOpen = currentHour >= 8 && currentHour < 22;

if (isOpen) {
    openStatus.textContent = '● Сейчас открыто';
    openStatus.classList.add('status-open');
} else {
    openStatus.textContent = '● Закрыто, откроемся в 8:00';
    openStatus.classList.add('status-closed');
}

// ===== Анимация появления при скролле (постоянная) =====

const revealTargets = document.querySelectorAll('.card, .section-title');

revealTargets.forEach(function (el) {
    el.classList.add('reveal');
});

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');    // вошёл в экран — показываем
        } else {
            entry.target.classList.remove('visible'); // ушёл с экрана — прячем
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(function (el) {
    observer.observe(el);
});

// ===== Кнопка "Наверх" =====

const toTopBtn = document.getElementById('toTopBtn');

window.addEventListener('scroll', function () {
    if (window.scrollY > 600) {
        toTopBtn.classList.add('show');
    } else {
        toTopBtn.classList.remove('show');
    }
});

toTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// ===== Табы меню с каскадной анимацией =====

const tabs = document.querySelectorAll('.tab');
const menuItems = document.querySelectorAll('.menu-item');

function showCategory(category) {
    let index = 0;

    menuItems.forEach(function (item) {
        if (item.dataset.category === category) {
            item.classList.add('visible');
            // каждая следующая карточка стартует на 0.08с позже
            item.style.animationDelay = index * 0.08 + 's';
            index++;
        } else {
            item.classList.remove('visible');
            item.style.animationDelay = '0s';
        }
    });
}

tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
            t.classList.remove('active');
        });
        this.classList.add('active');
        showCategory(this.dataset.category);
    });
});

// Показываем кофе при загрузке
showCategory('coffee');