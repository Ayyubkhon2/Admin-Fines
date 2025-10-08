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

/* Translation */
i18next.init({
        lng: savedLang,
        debug: true,
        interpolation: { escapeValue: false },
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
                    warning: "В базе данных числится 1 неоплаченный штраф",
                    violation_title: "Нарушение",
                    violation_text: "Приказ ген.директора центра по координации  рынка ценных бумаг при госкомимуществе республики Узбекистан",
                    term_title: "Срок",
                    term_text: "до 16.07.2025",
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
                    warning: "There is 1 unpaid fine in the database",
                    violation_title: "Violation",
                    violation_text: "Order of the CEO of the Center for Coordination of the Securities Market under the SPC of the Republic of Uzbekistan",
                    term_title: "Term",
                    term_text: "until 16.07.2025",
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
                    warning: "Ma'lumotlar bazasida 1 ta to'lanmagan jarima mavjud",
                    violation_title: "Qoidabuzarlik",
                    violation_text: "O'zbekiston Respublikasi DMBQ huzuridagi Qimmatli qog'ozlar bozorini muvofiqlashtirish markazi Bosh dir.ning buyrug'i",
                    term_title: "Muddat",
                    term_text: "16.07.2025 gacha",
                },
            },
        },
    },
    function(err, t) {
        updateContent();
    }
);

function changeLang(lang) {
    i18next.changeLanguage(lang, () => {
        updateContent();
    });
}