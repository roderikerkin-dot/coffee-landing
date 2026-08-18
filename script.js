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

const revealTargets = document.querySelectorAll('.card:not(.menu-item), .section-title');

revealTargets.forEach(function (el) {
    el.classList.add('reveal');
});

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');     // вошёл в экран — показываем
        } else {
            entry.target.classList.remove('visible');  // ушёл с экрана — прячем
        }
    });
}, { threshold: 0.1 });

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
// ===== Прелоадер-чашка: кофе заливается, сайт открывается =====

const preloader = document.getElementById('preloader');
const cupFill = document.getElementById('cupFill');
const preloaderCount = document.getElementById('preloaderCount');

if (preloader && cupFill) {
    document.body.classList.add('loading');

    let progress = 0;
    const timer = setInterval(function () {
        progress += Math.floor(Math.random() * 10) + 4;
        if (progress >= 100) progress = 100;

        cupFill.style.height = progress + '%';
        if (preloaderCount) preloaderCount.textContent = progress + '%';

        if (progress === 100) {
            clearInterval(timer);
            setTimeout(function () {
                preloader.classList.add('done');
                document.body.classList.remove('loading');
            }, 400);
            setTimeout(function () {
                preloader.remove();
            }, 1500);
        }
    }, 120);
}

// ===== Напиток дня: меняется по дню недели =====

const dailyDrinks = [
    { e: '🌿', n: 'Лавандовый раф', d: 'Нежный раф с сиропом лаванды и облаком молочной пены.', p: '320 ₽' },
    { e: '🍊', n: 'Цитрусовый колд брю', d: 'Холодный кофе, апельсин и тоник. Освежает как утро выходного.', p: '300 ₽' },
    { e: '🍯', n: 'Медовый капучино', d: 'Классика с ложкой горного мёда и корицей.', p: '280 ₽' },
    { e: '🧋', n: 'Карамельный латте', d: 'Домашняя карамель и двойной эспрессо на шелковистом молоке.', p: '290 ₽' },
    { e: '🍨', n: 'Гляссе', d: 'Холодный кофе с шариком пломбира. Почти десерт.', p: '310 ₽' },
    { e: '🌰', n: 'Ореховый флэт уайт', d: 'Фундучная паста, эспрессо и молоко. Выбор знатоков.', p: '330 ₽' },
    { e: '🍫', n: 'Мокко', d: 'Эспрессо, молоко и бельгийский шоколад. Тёплый уют.', p: '300 ₽' }
];

const dailyName = document.getElementById('dailyName');

if (dailyName) {
    const today = dailyDrinks[new Date().getDay()];
    document.getElementById('dailyEmoji').textContent = today.e;
    dailyName.textContent = today.n;
    document.getElementById('dailyDesc').textContent = today.d;
    document.getElementById('dailyPrice').textContent = today.p;
}

// ===== Карта гостя: регистрация + штампы с сохранением =====

(function () {
    const formBox = document.getElementById('loyaltyForm');
    const cardBox = document.getElementById('loyaltyCard');
    if (!formBox || !cardBox) return;

    const stampsBox = document.getElementById('stamps');

    // строим 6 ячеек штампов
    for (let i = 0; i < 6; i++) {
        const b = document.createElement('button');
        b.className = 'stamp' + (i === 5 ? ' gift' : '');
        if (i === 5) b.textContent = '🎁';
        stampsBox.appendChild(b);
    }

    // маска телефона для анкеты
    const regPhone = document.getElementById('regPhone');
    regPhone.addEventListener('input', function () {
        let digits = this.value.replace(/\D/g, '');
        if (digits.startsWith('8')) digits = '7' + digits.slice(1);
        if (!digits.startsWith('7') && digits.length > 0) digits = '7' + digits;
        digits = digits.slice(0, 11);

        let formatted = '+7';
        if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
        if (digits.length >= 5) formatted += ') ' + digits.slice(4, 7);
        if (digits.length >= 8) formatted += '-' + digits.slice(7, 9);
        if (digits.length >= 10) formatted += '-' + digits.slice(9, 11);
        this.value = formatted;
    });

    function loadData() {
        try { return JSON.parse(localStorage.getItem('bbCard')); }
        catch (e) { return null; }
    }

    function saveData(data) {
        localStorage.setItem('bbCard', JSON.stringify(data));
    }

    function renderCard(data) {
        document.getElementById('cardName').textContent = data.name;
        document.getElementById('cardSince').textContent = 'гость с ' + data.since;

        const stamps = stampsBox.querySelectorAll('.stamp');
        stamps.forEach(function (s, i) {
            const on = !!data.stamps[i];
            s.classList.toggle('stamped', on);
            s.textContent = on ? '☕' : (i === 5 ? '🎁' : '');
        });

        const count = data.stamps.filter(Boolean).length;
        document.getElementById('cardHint').textContent = count >= 6
            ? '🎉 Карта заполнена! Твой кофе — бесплатно. Покажи экран бариста.'
            : 'Собрано ' + count + ' из 6. Нажимай на ячейки, когда получаешь кофе.';
    }

    function showCard(data) {
        formBox.hidden = true;
        cardBox.hidden = false;
        renderCard(data);
    }

    // если уже регистрировался — сразу показываем карту
    const saved = loadData();
    if (saved) showCard(saved);

    document.getElementById('regSubmit').addEventListener('click', function () {
        const name = document.getElementById('regName').value.trim();
        const phone = document.getElementById('regPhone').value.trim();
        const consent = document.getElementById('regConsent').checked;
        const err = document.getElementById('regError');

        if (!name || phone.replace(/\D/g, '').length < 11 || !consent) {
            err.hidden = false;
            return;
        }
        err.hidden = true;

        const data = {
            name: name,
            phone: phone,
            email: document.getElementById('regEmail').value.trim(),
            since: new Date().toLocaleDateString('ru-RU'),
            stamps: [false, false, false, false, false, false]
        };
        saveData(data);
        showCard(data);
    });

    stampsBox.addEventListener('click', function (e) {
        const stamp = e.target.closest('.stamp');
        if (!stamp) return;
        const data = loadData();
        if (!data) return;

        const idx = Array.prototype.indexOf.call(stampsBox.children, stamp);
        data.stamps[idx] = !data.stamps[idx];
        saveData(data);
        renderCard(data);
    });

    document.getElementById('loyaltyLogout').addEventListener('click', function () {
        localStorage.removeItem('bbCard');
        cardBox.hidden = true;
        formBox.hidden = false;
    });
})();

// ===== Квиз «Подбери напиток» (расширенный, 16 напитков) =====

(function () {
    const quizGame = document.getElementById('quizGame');
    if (!quizGame) return;

    const quizQuestions = [
        { key: 'milk', q: 'Как относишься к молоку?', a: [
            { t: 'Люблю, с молоком', v: 'love' },
            { t: 'Нейтрально', v: 'ok' },
            { t: 'Без молока', v: 'no' }
        ]},
        { key: 'sweet', q: 'Насколько сладко?', a: [
            { t: 'Сладко', v: 'sweet' },
            { t: 'Умеренно', v: 'mid' },
            { t: 'Без сахара', v: 'no' }
        ]},
        { key: 'temp', q: 'Какой температуры?', a: [
            { t: 'Горячий', v: 'hot' },
            { t: 'Холодный', v: 'cold' },
            { t: 'Любая', v: 'any' }
        ]},
        { key: 'vibe', q: 'Какое настроение?', a: [
            { t: 'Нужен заряд бодрости', v: 'energy' },
            { t: 'Хочу расслабиться', v: 'relax' },
            { t: 'Удиви меня', v: 'unusual' }
        ]},
        { key: 'limit', q: 'Есть ограничения?', a: [
            { t: 'Нет', v: 'none' },
            { t: 'Не хочу мороженое', v: 'noice' },
            { t: 'Не хочу молоко', v: 'nomilk' },
            { t: 'Без кофеина', v: 'nocof' }
        ]}
    ];

    // milk: 0 без молока, 1 с молоком, 2 по желанию; sweet: 0/1/2
    const quizDrinks = [
        { n: 'Эспрессо', e: '⚡', d: '30 мл чистой энергии.', milk: 0, sweet: 0, temp: 'hot', vibe: 'energy', ing: ['coffee'] },
        { n: 'Американо', e: '☕', d: 'Эспрессо и вода. Ничего лишнего.', milk: 2, sweet: 0, temp: 'hot', vibe: 'energy', ing: ['coffee'] },
        { n: 'Флэт уайт', e: '☕', d: 'Крепкий, но шелковистый. Выбор знатоков.', milk: 1, sweet: 0, temp: 'hot', vibe: 'energy', ing: ['coffee', 'milk'] },
        { n: 'Капучино', e: '☕', d: 'Классика с нежной пенкой.', milk: 1, sweet: 1, temp: 'hot', vibe: 'relax', ing: ['coffee', 'milk'] },
        { n: 'Латте', e: '🥛', d: 'Много молока и мягкий кофе.', milk: 1, sweet: 1, temp: 'hot', vibe: 'relax', ing: ['coffee', 'milk'] },
        { n: 'Айс латте', e: '🧋', d: 'Молоко, лёд и двойной эспрессо.', milk: 1, sweet: 1, temp: 'cold', vibe: 'relax', ing: ['coffee', 'milk'] },
        { n: 'Раф ванильный', e: '🍦', d: 'Сливочный, сладкий, обнимающий.', milk: 1, sweet: 2, temp: 'hot', vibe: 'relax', ing: ['coffee', 'milk'] },
        { n: 'Лавандовый раф', e: '🌿', d: 'Раф с сиропом лаванды. Нежный сюрприз.', milk: 1, sweet: 2, temp: 'hot', vibe: 'unusual', ing: ['coffee', 'milk'] },
        { n: 'Гляссе', e: '🍨', d: 'Холодный кофе с шариком мороженого.', milk: 1, sweet: 2, temp: 'cold', vibe: 'unusual', ing: ['coffee', 'milk', 'icecream'] },
        { n: 'Эспрессо-тоник', e: '🍹', d: 'Лёд, тоник и эспрессо. Освежает как волна.', milk: 0, sweet: 1, temp: 'cold', vibe: 'unusual', ing: ['coffee', 'tonic'] },
        { n: 'Колд брю', e: '🧊', d: '12 часов холодного заваривания. Мягко и бодро.', milk: 0, sweet: 0, temp: 'cold', vibe: 'energy', ing: ['coffee'] },
        { n: 'Колд брю с цитрусом', e: '🍊', d: 'Колд брю, апельсин и лёгкая сладость.', milk: 0, sweet: 1, temp: 'cold', vibe: 'unusual', ing: ['coffee'] },
        { n: 'Какао с маршмеллоу', e: '🍫', d: 'Тёплое какао и облако маршмеллоу. Без кофе.', milk: 1, sweet: 2, temp: 'hot', vibe: 'relax', ing: ['milk'] },
        { n: 'Матча латте', e: '🍵', d: 'Японский чай матча на молоке. Спокойная бодрость.', milk: 1, sweet: 1, temp: 'hot', vibe: 'unusual', ing: ['milk', 'tea'] },
        { n: 'Облепиховый чай', e: '🫖', d: 'Облепиха, апельсин и мёд. Без кофе.', milk: 0, sweet: 1, temp: 'hot', vibe: 'relax', ing: ['tea'] },
        { n: 'Айс матча', e: '🧊', d: 'Холодная матча с молоком и льдом.', milk: 1, sweet: 1, temp: 'cold', vibe: 'unusual', ing: ['milk', 'tea'] }
    ];

    const stepEl = document.getElementById('quizStep');
    const qEl = document.getElementById('quizQ');
    const answersEl = document.getElementById('quizAnswers');
    const resultEl = document.getElementById('quizResult');
    const answers = {};
    let qi = 0;

    function showQuestion() {
        const q = quizQuestions[qi];
        stepEl.textContent = 'Вопрос ' + (qi + 1) + ' из ' + quizQuestions.length;
        qEl.textContent = q.q;
        answersEl.innerHTML = '';

        q.a.forEach(function (opt) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = opt.t;
            btn.addEventListener('click', function () {
                answers[q.key] = opt.v;
                qi++;
                if (qi < quizQuestions.length) showQuestion();
                else showResult();
            });
            answersEl.appendChild(btn);
        });
    }

    function calcResults() {
        const list = [];

        quizDrinks.forEach(function (drink) {
            // жёсткие фильтры по ограничениям
            if (answers.limit === 'noice' && drink.ing.indexOf('icecream') !== -1) return;
            if (answers.limit === 'nomilk' && drink.ing.indexOf('milk') !== -1) return;
            if (answers.limit === 'nocof' && drink.ing.indexOf('coffee') !== -1) return;

            let score = 0;

            if (answers.milk === 'love') score += drink.milk === 1 ? 2 : (drink.milk === 2 ? 1 : -2);
            if (answers.milk === 'no')   score += drink.milk === 0 ? 2 : (drink.milk === 2 ? 1 : -2);
            if (answers.milk === 'ok')   score += 1;

            if (answers.sweet === 'sweet') score += drink.sweet === 2 ? 2 : (drink.sweet === 1 ? 1 : -1);
            if (answers.sweet === 'mid')   score += drink.sweet === 1 ? 2 : 0;
            if (answers.sweet === 'no')    score += drink.sweet === 0 ? 2 : (drink.sweet === 1 ? 0 : -2);

            if (answers.temp === 'hot')  score += drink.temp === 'hot' ? 2 : -2;
            if (answers.temp === 'cold') score += drink.temp === 'cold' ? 2 : -2;
            if (answers.temp === 'any')  score += 1;

            if (drink.vibe === answers.vibe) score += 2;

            list.push({ drink: drink, score: score });
        });

        list.sort(function (a, b) { return b.score - a.score; });
        return list.slice(0, 2);
    }

    function showResult() {
        const top = calcResults();

        quizGame.hidden = true;
        resultEl.hidden = false;

        document.getElementById('quizEmoji').textContent = top[0].drink.e;
        document.getElementById('quizName').textContent = top[0].drink.n;
        document.getElementById('quizDesc').textContent = top[0].drink.d;

        const altBox = document.getElementById('quizAlt');
        if (top.length > 1) {
            altBox.hidden = false;
            document.getElementById('quizAltName').textContent = top[1].drink.n;
            document.getElementById('quizAltDesc').textContent = top[1].drink.d;
        } else {
            altBox.hidden = true;
        }
    }

    document.getElementById('quizRestart').addEventListener('click', function () {
        qi = 0;
        for (const key in answers) delete answers[key];
        resultEl.hidden = true;
        quizGame.hidden = false;
        showQuestion();
    });

    showQuestion();
})();