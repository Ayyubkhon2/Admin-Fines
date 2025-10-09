// --------------- Advanced Variant Switcher (with hash navigation) ---------------
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".services__btn");
    const variants = document.querySelectorAll(".services__variant");

    function activateVariantById(id) {
        const target = document.getElementById(id);
        const button = document.querySelector(`[data-variant="${id}"]`);

        if (!target) return;

        // Update buttons
        buttons.forEach((b) => b.classList.remove("services__btn--active"));
        if (button) button.classList.add("services__btn--active");

        // Update variants
        variants.forEach((v) => {
            v.classList.remove("services__variant--active");
            v.style.display = "none";
        });

        target.classList.add("services__variant--active");
        target.style.display = "block";
    }

    // Initial setup: hide inactive variants
    variants.forEach((v) => {
        v.style.display = v.classList.contains("services__variant--active") ?
            "block" :
            "none";
    });

    // Handle click switching
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.variant;
            if (targetId) {
                activateVariantById(targetId);
                history.replaceState(null, "", `#${targetId}`); // optional: update URL
            }
        });
    });

    // Handle navigation via URL hash (#finance, #corporate, #investment)
    const hash = window.location.hash.substring(1);
    if (hash) activateVariantById(hash);
});

// --------------- Advanced Variant Switcher (with hash navigation) ---------------
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".mini-services__btn");
    const variants = document.querySelectorAll(".mini-services__variant");

    function activateMiniVariantById(id) {
        const target = document.getElementById(id);
        const button = document.querySelector(`[data-mini="${id}"]`);

        if (!target) return;

        // Update buttons
        buttons.forEach((b) => b.classList.remove("mini-services__btn--active"));
        if (button) button.classList.add("mini-services__btn--active");

        // Update variants
        variants.forEach((v) => {
            v.classList.remove("mini-services__variant--active");
            v.style.display = "none";
        });

        target.classList.add("mini-services__variant--active");
        target.style.display = "block";
    }

    // Initial setup: hide inactive variants
    variants.forEach((v) => {
        v.style.display = v.classList.contains("mini-services__variant--active") ?
            "block" :
            "none";
    });

    // Handle click switching
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.mini;
            if (targetId) {
                activateMiniVariantById(targetId);
                history.replaceState(null, "", `#${targetId}`); // optional: update URL
            }
        });
    });

    // Handle navigation via URL hash (#finance, #corporate, #investment)
    const hash = window.location.hash.substring(1);
    if (hash) activateMiniVariantById(hash);
});

// --------------- Counter ---------------
// function startCounters(container) {
//   const counters = container.querySelectorAll("[data-target]");
//   const duration = 2000; // ms

//   counters.forEach((counter) => {
//     const target = +counter.getAttribute("data-target");
//     let start = null;

//     const updateCount = (timestamp) => {
//       if (!start) start = timestamp;
//       const progress = timestamp - start;
//       const progressRatio = Math.min(progress / duration, 1);

//       counter.innerText = Math.floor(progressRatio * target);

//       if (progress < duration) {
//         requestAnimationFrame(updateCount);
//       } else {
//         counter.innerText = target;
//       }
//     };

//     requestAnimationFrame(updateCount);
//   });
// }

// ---------------  Observer ---------------
// function observeCounters(selector) {
//   const containers = document.querySelectorAll(selector);

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           startCounters(entry.target);
//         } else {
//           entry.target.querySelectorAll("[data-target]").forEach((counter) => {
//             counter.innerText = "0";
//           });
//         }
//       });
//     },
//     { threshold: 0.3 }
//   );

//   containers.forEach((container) => observer.observe(container));
// }

// document.addEventListener("DOMContentLoaded", () => {
//   observeCounters(".statistics");
// });

document.addEventListener("DOMContentLoaded", () => {
    // --- i18next initialization ---
    i18next.init({
        lng: savedLang || "ru",
        fallbackLng: "ru",
        debug: true,
        interpolation: { escapeValue: false },
        compatibilityJSON: "v3",
        keySeparator: ".",
        resources: {
            ru: {
                translation: {
                    nav1: "Главная",
                    nav2: "Услуги",
                    nav3: "Нормативные акты",
                    cabinet: "Кабинет",
                    footer: "© 2025 Все права защищены. Национальное агентство перспективных проектов",
                    service: "Услуги",
                    calculator: "Калькулятор штрафов",
                    appeal: "Подать апелляцию",
                    fines: "Административные штрафы",
                    sanctions: "Финансовые санкции",
                    calculator: "Калькулятор штрафов",
                    appeal: "Подать апелляцию",
                    subtitle: "Непогашенные административные штрафы",
                    passport: "Поиск по паспорту",
                    receipt: "Поиск по квитанции",
                    protocol: "Поиск по протоколу",
                    passport_reg: "Серия паспорта",
                    passport_number: "Номер паспорта",
                    search: "Найти",
                    warning: "В базе данных числится {{count}} неоплаченный штраф",
                    warning_few: "В базе данных числятся {{count}} неоплаченных штрафа",
                    warning_many: "В базе данных числятся {{count}} неоплаченных штрафов",
                    warning_other: "В базе данных числится {{count}} неоплаченный штраф",


                    violation_title: "Нарушение",
                    messages: {
                        v1: {
                            violation: "Приказ ген.директора центра по координации рынка ценных бумаг при госкомимуществе республики Узбекистан",
                            term: "до 16.07.2025"
                        },
                        v2: {
                            violation: "Постановление заместителя директора агентства по лицензированию",
                            term: "до 20.08.2025"
                        },
                        template: {
                            violation: "Lorem Ipsum",
                            term: "до 02.09.2025"
                        },
                    },
                    num_title: "№",
                    num_text: "2383",
                    term_title: "Срок",
                    term_text: "до 16.07.2025",
                    receipt_num: "Номер квитанции",
                    protocol_reg: "Серия протокола",
                    protocol_number: "Номер протокола",
                    id: "Поиск по ИНН",
                    receipt2: "Поиск по квитанции",
                    protocol2: "Поиск по протоколу",
                    subtitle2: "Непогашенные финансовые санкции",
                    id_reg: "Названия преприятия",
                    id_number: "ИНН преприятия",
                },
            },
            en: {
                translation: {
                    nav1: "Home",
                    nav2: "Services",
                    nav3: "Regulatory acts",
                    cabinet: "Cabinet",
                    footer: "© 2025 All rights reserved. National Agency of Perspective Projects",
                    service: "Services",
                    calculator: "Fines Calculator",
                    appeal: "Submit an appeal",
                    fines: "Administrative fines",
                    sanctions: "Financial sanctions",
                    calculator: "Penalty Calculator",
                    appeal: "Submit an Appeal",
                    subtitle: "Unpaid administrative fines",
                    passport: "Search by passport",
                    receipt: "Search by receipt",
                    protocol: "Search by protocol",
                    passport_reg: "Passport series",
                    passport_number: "Passport number",
                    search: "Search",
                    warning: "There is {{count}} unpaid fine in the database",
                    warning_one: "There is {{count}} unpaid fine in the database",
                    warning_other: "There are {{count}} unpaid fines in the database",

                    violation_title: "Violation",
                    messages: {
                        v1: {
                            violation: "Order of the CEO of the Center for Coordination of the Securities Market under the SPC of the Republic of Uzbekistan",
                            term: "until 16.07.2025"
                        },
                        v2: {
                            violation: "Decree of the Deputy Director of the Licensing Agency",
                            term: "until 20.08.2025"
                        },
                        template: {
                            violation: "Lorem Ipsum",
                            term: "until 02.09.2025"
                        },
                    },
                    num_title: "№",
                    num_text: "2383",
                    term_title: "Term",
                    receipt_num: "Receipt number",
                    protocol_reg: "Protocol series",
                    protocol_number: "Protocol number",
                    id: "Search by TIN",
                    receipt2: "Search by receipt",
                    protocol2: "Search by protocol",
                    subtitle2: "Unpaid financial sanctions",
                    id_reg: "Name of the enterprise",
                    id_number: "TIN of the enterprise",
                },
            },
            uz: {
                translation: {
                    nav1: "Bosh sahifa",
                    nav2: "Xizmat",
                    nav3: "Me'yoriy hujjatlar",
                    cabinet: "Kabinet",
                    footer: "© 2025 Barcha huquqlar himoyalangan. Istiqbolli loyihalar milliy agentligi",
                    service: "Xizmatlar",
                    calculator: "Jarimalar kalkulyatori",
                    appeal: "Shikoyat yuborish",
                    fines: "Ma'muriy jarimalar",
                    sanctions: "Moliyaviy sanksiyalar",
                    calculator: "Jarimalar kalkulyatori",
                    appeal: "Apellyatsiya yuborish",
                    subtitle: "To'lanmagan ma'muriy jarimalar",
                    passport: "Pasport bo'yicha qidiruv",
                    receipt: "Kvitansiya bo'yicha qidiruv",
                    protocol: "Protokol bo'yicha qidiruv",
                    passport_reg: "Pasport seriyasi",
                    passport_number: "Pasport raqami",
                    search: "Qidirish",
                    warning: "Ma'lumotlar bazasida {{count}} ta to'lanmagan jarima mavjud",
                    warning_one: "Ma'lumotlar bazasida {{count}} ta to'lanmagan jarima mavjud",
                    warning_other: "Ma'lumotlar bazasida {{count}} ta to'lanmagan jarimalar mavjud",

                    violation_title: "Qoidabuzarlik",
                    messages: {
                        v1: {
                            violation: "O'zbekiston Respublikasi DMBQ huzuridagi Qimmatli qog'ozlar bozorini muvofiqlashtirish markazi Bosh dir.ning buyrug'i",
                            term: "16.07.2025 gacha"
                        },
                        v2: {
                            violation: "Litsenziyalash agentligi direktor o'rinbosarining qarori",
                            term: "20.08.2025 gacha"
                        },
                        template: {
                            violation: "Lorem Ipsum",
                            term: "02.09.2025 gacha"
                        },
                    },
                    num_title: "№",
                    num_text: "2383",
                    term_title: "Muddat",
                    receipt_num: "Kvitansiya raqami",
                    protocol_reg: "Protokol seriyasi",
                    protocol_number: "Protokol raqami",
                    subtitle2: "To'lanmagan moliyaviy sanksiyalar",
                    id: "STIR bo'yicha qidiruv",
                    receipt2: "Kvitansiya bo'yicha qidiruv",
                    protocol2: "Protokol bo'yicha qidiruv",
                    id_reg: "Korxona nomi",
                    id_number: "Korxonaning STIR raqami",
                },
            },
        },
    }, (err, t) => {
        if (err) console.error("i18next init error:", err);

        // Initialize all static translations
        updateGlobalTranslations();

        // Define messages
        window.messages1 = [
            { violation_key: "messages.v1.violation", num_text: "2383", term_key: "messages.v1.term" },
            { violation_key: "messages.v2.violation", num_text: "2384", term_key: "messages.v2.term" },
            { violation_key: "messages.template.violation", num_text: "2385", term_key: "messages.template.term" },
            { violation_key: "messages.template.violation", num_text: "2386", term_key: "messages.template.term" }
        ];
        window.messages2 = [
            { violation_key: "messages.template.violation", num_text: "2385", term_key: "messages.template.term" },
            { violation_key: "messages.template.violation", num_text: "2386", term_key: "messages.template.term" }
        ];
        window.messages3 = [
            { violation_key: "messages.template.violation", num_text: "2385", term_key: "messages.template.term" }
        ];
        window.messages4 = [
            { violation_key: "messages.template.violation", num_text: "2385", term_key: "messages.template.term" },
            { violation_key: "messages.template.violation", num_text: "2386", term_key: "messages.template.term" },
            { violation_key: "messages.template.violation", num_text: "2386", term_key: "messages.template.term" }
        ];
        window.messages5 = [
            { violation_key: "messages.template.violation", num_text: "2385", term_key: "messages.template.term" },
            { violation_key: "messages.template.violation", num_text: "2386", term_key: "messages.template.term" }
        ];
        window.messages6 = [
            { violation_key: "messages.template.violation", num_text: "2385", term_key: "messages.template.term" }
        ];

        // Initialize message boards
        initMessageBoard(".mini-services__message-board--1", window.messages1);
        initMessageBoard(".mini-services__message-board--2", window.messages2);
        initMessageBoard(".mini-services__message-board--3", window.messages3);
        initMessageBoard(".mini-services__message-board--4", window.messages4);
        initMessageBoard(".mini-services__message-board--5", window.messages5);
        initMessageBoard(".mini-services__message-board--6", window.messages6);
    });

    // --- Function to translate all elements globally ---
    function updateGlobalTranslations() {
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.dataset.i18n;
            if (key) el.textContent = i18next.t(key);
        });
    }

    // --- message board logic ---
    function initMessageBoard(boardSelector, messagesArr) {
        const board = document.querySelector(boardSelector);
        if (!board) return;

        function translateElements(countForWarning = 0) {
            board.querySelectorAll("[data-i18n]").forEach((el) => {
                const key = el.dataset.i18n;
                if (key) el.textContent = i18next.t(key, { count: countForWarning });
            });
        }

        function getWarningText(count) {
            const tExists = (k) => i18next.exists(k);
            const t = (k, opts) => i18next.t(k, opts);
            const lang = i18next.language || "ru";

            if (lang.startsWith("ru")) {
                const mod10 = count % 10;
                const mod100 = count % 100;

                // Proper Russian pluralization rules:
                const isOne = mod10 === 1 && mod100 !== 11;
                const isFew = mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14);
                const isMany = !isOne && !isFew;

                if (isOne && tExists("warning_one")) return t("warning_one", { count });
                if (isFew && tExists("warning_few")) return t("warning_few", { count });
                if (isMany && tExists("warning_many")) return t("warning_many", { count });

                // fallback if i18n keys missing
                if (isOne) return `В базе данных числится ${count} неоплаченный штраф`;
                if (isFew) return `В базе данных числятся ${count} неоплаченных штрафа`;
                return `В базе данных числятся ${count} неоплаченных штрафов`;
            }

            const key = count <= 1 ? "warning_one" : "warning_other";
            if (tExists(key)) return t(key, { count });
            return count <= 1 ?
                `There is ${count} unpaid fine in the database` :
                `There are ${count} unpaid fines in the database`;
        }

        function renderMessages(messagesArr) {
            board.innerHTML = "";

            // Header warning
            const header = document.createElement("div");
            header.className = "mini-services__message";

            const warningImg = document.createElement("img");
            warningImg.className = "mini-services__warning";
            warningImg.src = "assets/warning.png";
            warningImg.alt = "";

            const warningSpan = document.createElement("span");
            warningSpan.textContent = getWarningText(messagesArr.length);

            header.append(warningImg, warningSpan);
            board.appendChild(header);

            // Messages
            messagesArr.forEach((msg) => {
                const box = document.createElement("div");
                box.className = "mini-services__message-box";

                const col1 = document.createElement("div");
                col1.className = "mini-services__column-big";
                const t1 = document.createElement("span");
                t1.className = "mini-services__message-title";
                t1.dataset.i18n = "violation_title";
                const text1 = document.createElement("span");
                text1.className = "mini-services__message-text";
                text1.dataset.i18n = msg.violation_key;
                text1.textContent = i18next.t(msg.violation_key);
                col1.append(t1, text1);

                const col2 = document.createElement("div");
                col2.className = "mini-services__column";
                const t2 = document.createElement("span");
                t2.className = "mini-services__message-title";
                t2.dataset.i18n = "num_title";
                const text2 = document.createElement("span");
                text2.className = "mini-services__message-text";
                text2.textContent = msg.num_text;
                col2.append(t2, text2);

                const col3 = document.createElement("div");
                col3.className = "mini-services__column";
                const t3 = document.createElement("span");
                t3.className = "mini-services__message-title";
                t3.dataset.i18n = "term_title";
                const text3 = document.createElement("span");
                text3.className = "mini-services__message-text";
                text3.dataset.i18n = msg.term_key;
                text3.textContent = i18next.t(msg.term_key);
                col3.append(t3, text3);

                const dl = document.createElement("div");
                dl.className = "mini-services__download-box";
                const downloadLink = document.createElement("a");
                downloadLink.href = `files/file-${msg.num_text}.pdf`;
                downloadLink.download = `file-${msg.num_text}.pdf`;

                const img = document.createElement("img");
                img.className = "mini-services__download";
                img.src = "assets/download.png";
                img.alt = "Download";

                downloadLink.appendChild(img);
                dl.appendChild(downloadLink);

                box.append(col1, col2, col3, dl);
                board.appendChild(box);
            });

            translateElements(messagesArr.length);
        }

        renderMessages(messagesArr);
    }

    // --- Language switcher ---
    window.changeLang = function(lang) {
        i18next.changeLanguage(lang, () => {
            // Update global UI
            updateGlobalTranslations();

            // Re-render all boards
            initMessageBoard(".mini-services__message-board--1", window.messages1);
            initMessageBoard(".mini-services__message-board--2", window.messages2);
            initMessageBoard(".mini-services__message-board--3", window.messages3);
            initMessageBoard(".mini-services__message-board--4", window.messages4);
            initMessageBoard(".mini-services__message-board--5", window.messages5);
            initMessageBoard(".mini-services__message-board--6", window.messages6);
        });
    };
});