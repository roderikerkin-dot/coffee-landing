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
// ===== Маска для телефона =====

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
    // Убираем всё, кроме цифр
    let digits = this.value.replace(/\D/g, '');
    
    // Если начинается с 8 — заменяем на 7
    if (digits.startsWith('8')) {
        digits = '7' + digits.slice(1);
    }
    
    // Если не начинается с 7 — добавляем
    if (!digits.startsWith('7') && digits.length > 0) {
        digits = '7' + digits;
    }
    
    // Ограничиваем 11 цифрами (7 + 10 цифр номера)
    digits = digits.slice(0, 11);
    
    // Форматируем
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

// При фокусе — если поле пустое, ставим "+7 ("
phoneInput.addEventListener('focus', function () {
    if (this.value === '') {
        this.value = '+7 (';
    }
});

// При потере фокуса — если ничего не введено, очищаем
phoneInput.addEventListener('blur', function () {
    if (this.value === '+7 (' || this.value === '+7') {
        this.value = '';
    }
});