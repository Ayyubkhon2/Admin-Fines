// --------------- Counter ---------------
function startCounters(container) {
  const counters = container.querySelectorAll("[data-target]");
  const duration = 2000; // ms

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let start = null;

    const updateCount = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressRatio = Math.min(progress / duration, 1);

      counter.innerText = Math.floor(progressRatio * target);

      if (progress < duration) {
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    requestAnimationFrame(updateCount);
  });
}

// ---------------  Observer ---------------
function observeCounters(selector) {
  const containers = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters(entry.target);
        } else {
          entry.target.querySelectorAll("[data-target]").forEach((counter) => {
            counter.innerText = "0";
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  containers.forEach((container) => observer.observe(container));
}

document.addEventListener("DOMContentLoaded", () => {
  observeCounters(".statistics");
});

// Map
document.addEventListener("DOMContentLoaded", () => {
  const provinces = document.querySelectorAll(".map__province");

  // Tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "map__tooltip";
  document.body.appendChild(tooltip);

  provinces.forEach((province) => {
    const regionKey = province.dataset.region;
    const value = parseInt(province.dataset.value, 10) || 0;

    // Hover in
    province.addEventListener("mouseenter", () => {
      const translatedName = regionKey
        ? i18next.t(`regions.${regionKey}`)
        : i18next.t("regions.unknown");

      tooltip.innerHTML = `<strong>${translatedName}</strong><br/>${value}`;
      tooltip.style.display = "block";

      // Create astral copy
      const copy = province.cloneNode(true);
      copy.classList.add("province-copy");

      // Full opacity version
      copy.setAttribute("fill-opacity", "1");

      // Start hidden (smooth transition in)
      copy.style.opacity = "0";
      copy.style.transform = "translateY(0)";
      copy.style.transition = "opacity 0.3s ease, transform 0.3s ease";

      province.parentNode.appendChild(copy);
      province._copy = copy;
      copy.style.pointerEvents = "none";

      // Trigger animation
      requestAnimationFrame(() => {
        copy.style.opacity = "1";
        copy.style.transform = "translateY(-10px)";
      });
    });

    // Move tooltip
    province.addEventListener("mousemove", (e) => {
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;

      let left = e.clientX + 15;
      let top = e.clientY + 15;

      if (left + tooltipWidth > window.innerWidth) {
        left = e.pageX - tooltipWidth - 15;
      }

      if (top + tooltipHeight > window.innerHeight) {
        top = e.pageY - tooltipHeight - 15;
      }

      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
    });

    // Hover out
    province.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";

      if (province._copy) {
        const copy = province._copy;

        // Animate fade-out
        copy.style.opacity = "0";
        copy.style.transform = "translateY(0)";

        // Remove after transition ends
        copy.addEventListener(
          "transitionend",
          () => {
            if (copy.parentNode) copy.remove();
          },
          { once: true }
        );

        delete province._copy;
      }
    });
  });
});



/* Translation */
i18next.init(
  {
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
          footer:
            "© 2025 Все права защищены. Национальное агентство перспективных проектов",
          hero_text:
            "Автоматизированная система применения административных штрафов в сфере рынка капитала",
          overview_title: "Общая статистика",
          overview_subtitle: "Статистика по штрафам",
          stats_companies: "Всего штрафов",
          stats_new: "Новые за месяц",
          stats_in_a: "Оплаченные",
          stats_in_b: "Просроченные",
          service: "Услуги",
          fine: "Узнать информацию об административных штрафах",
          sanction: "Узнать информацию о финансовых санкциях ",
          calculator: "Калькулятор штрафов",
          appeal: "Подать апелляцию", 

         
          switcher_cards: "Административные штрафы",
          switcher_overview: "Финансовые санкции",
          map_title: "Меры наказания эмитентов",


          regions: {
            karakalpakstan: "Республика Каракалпакстан",
            andijan: "Андижанская область",
            bukhara: "Бухарская область",
            fergana: "Ферганская область",
            jizzakh: "Джизакская область",
            namangan: "Наманганская область",
            navoiy: "Навоийская область",
            kashkadarya: "Кашкадарьинская область",
            samarkand: "Самаркандская область",
            surkhandarya: "Сурхандарьинская область",
            syrdarya: "Сырдарьинская область",
            tashkent: "Ташкентская область",
            tashkent_city: "г. Ташкент",
            khorezm: "Хорезмская область",
          },
        },
      },
      en: {
        translation: {
          nav1: "Home",
          nav2: "Services",
          nav3: "Regulatory acts",
          cabinet: "Cabinet",
          footer:
            "© 2025 All rights reserved. National Agency of Perspective Projects",
          hero_text:
            "Automated System for Applying Administrative Fines in the Capital Market",
          overview_title: "General statistics",
          overview_subtitle: "Penalty statistics",
          stats_companies: "Total fines",
          stats_new: "New for a month",
          stats_in_a: "Paid",
          stats_in_b: "Overdue",
          service: "Services",
          fine: "Learn about administrative fines",
          sanction: "Learn information about financial sanctions",
          calculator: "Fines Calculator",
          appeal: "Submit an appeal",
          switcher_cards: "Administrative fines",
          switcher_overview: "Financial sanctions",
          map_title: "Penalties for issuers",
          regions: {
            karakalpakstan: "Republic of Karakalpakstan",
            andijan: "Andijan Region",
            bukhara: "Bukhara Region",
            fergana: "Fergana Region",
            jizzakh: "Jizzakh Region",
            namangan: "Namangan Region",
            navoiy: "Navoi Region",
            kashkadarya: "Kashkadarya Region",
            samarkand: "Samarkand Region",
            surkhandarya: "Surkhandarya Region",
            syrdarya: "Syrdarya Region",
            tashkent: "Tashkent Region",
            tashkent_city: "Tashkent City",
            khorezm: "Khorezm Region",
          },
        },
      },
      uz: {
        translation: {
          nav1: "Bosh sahifa",
          nav2: "Xizmat",
          nav3: "Me'yoriy hujjatlar",
          cabinet: "Kabinet",
          footer:
            "© 2025 Barcha huquqlar himoyalangan. Istiqbolli loyihalar milliy agentligi",
          hero_text:
            "Kapital bozori sohasida ma'muriy jarimalarni qo'llashning avtomatlashtirilgan tizimi",
          overview_title: "Umumiy statistika",
          overview_subtitle: "Jarimalar statistikasi",
          stats_companies: "Jami jarimalar",
          stats_new: "Oylik yangiliklar",
          stats_in_a: "To'langan",
          stats_in_b: "Muddati o'tgan",
          service: "Xizmatlar",
          fine: "Ma'muriy jarimalar to'g'risidagi ma'lumotlarni bilish",
          sanction: "Moliyaviy sanksiyalar to'g'risida ma'lumot olish",
          calculator: "Jarimalar kalkulyatori",
          appeal: "Shikoyat yuborish",
          switcher_cards: "Ma'muriy jarimalar",
          switcher_overview: "Moliyaviy sanksiyalar",
          map_title: "Emitentlarni jazolash choralari",
          regions: {
            karakalpakstan: "Qoraqalpog'iston Respublikasi",
            andijan: "Andijon viloyati",
            bukhara: "Buxoro viloyati",
            fergana: "Farg'ona viloyati",
            jizzakh: "Jizzax viloyati",
            namangan: "Namangan viloyati",
            navoiy: "Navoiy viloyati",
            kashkadarya: "Qashqadaryo viloyati",
            samarkand: "Samarqand viloyati",
            surkhandarya: "Surxondaryo viloyati",
            syrdarya: "Sirdaryo viloyati",
            tashkent: "Toshkent viloyati",
            tashkent_city: "Toshkent shahri",
            khorezm: "Xorazm viloyati",
          },
        },
      },
    },
  },
  function (err, t) {
    updateContent();
  }
);

function changeLang(lang) {
  i18next.changeLanguage(lang, () => {
    updateContent();
  });
}
