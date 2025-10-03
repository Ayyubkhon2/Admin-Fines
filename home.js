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

  // Example: fetch numbers from dataset (expand if you’ll add more values later)
  const stat1 = province.dataset.value1 || province.dataset.value || 0;
  const stat2 = province.dataset.value2 || 0;
  const stat3 = province.dataset.value3 || 0;

    tooltip.innerHTML = `
    <div class="tooltip__header">${translatedName}</div>
    <div class="tooltip__stats">
      <div class="tooltip__stat">
        <span class="tooltip__icon"><img src="assets/institution-icon.png"></span>
        <span class="tooltip__number1">${stat1}</span>
      </div>
      <div class="tooltip__stat">
        <span class="tooltip__icon"><img src="assets/fines-icon.png"></span>
        <span class="tooltip__number2">${stat2}</span>
      </div>
      <div class="tooltip__stat">
        <span class="tooltip__icon"><img src="assets/amount-icon.png"></span>
        <span class="tooltip__number3">${stat3}</span>  
      </div>
    </div>
  `;
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









// const track = document.querySelector(".carousel__track");

// function updateContent() {
//   track.innerHTML = "";

//   carouselData.forEach((item) => {
//     const card = template.content.cloneNode(true);
//     populateCard(card, item, "carousel");
//     track.appendChild(card);
//   });
// }




// Slider logic

let isVertical = false; 
function initSlider() {
  const btnLeft = document.querySelector(".carousel__btn--left");
  const btnRight = document.querySelector(".carousel__btn--right");
  if (!track || !btnLeft || !btnRight) return;

  let cardWidth = 0;
let gap = 0;

  let groupSize = 3;
  let index = 0;
  let baseOffset = 0;
  let autoplayTimer;
  let scrollCooldown = false;

function measure() {
  const cards = Array.from(track.querySelectorAll(".carousel__card"));
  if (!cards.length) return 0;

  const r0 = cards[0].getBoundingClientRect();
  const r1 = cards[1]?.getBoundingClientRect();

  // detect vertical layout
  isVertical = r1 && (r1.top - (r0.top + r0.height)) > 0;

  if (isVertical) {
    cardHeight = r0.height + gap;
    groupSize = 1; 
  } else {
    cardWidth = r0.width + gap;
    if (window.innerWidth >= 1200) groupSize = 3;
    else if (window.innerWidth >= 800) groupSize = 2;
    else groupSize = 1;
  }

  return cards.length;
}

function applyTransform() {
  const offset = index * (isVertical ? cardHeight : cardWidth) * groupSize;
  track.style.transform = isVertical
    ? `translateY(-${offset}px)`
    : `translateX(-${offset}px)`;
}




function goRight() {
  const cardsLength = measure();
  const maxIndex = Math.ceil(cardsLength / groupSize) - 1;
  if (index < maxIndex) index++;
  else index = 0;
  applyTransform();
}

function goLeft() {
  const cardsLength = measure();
  const maxIndex = Math.ceil(cardsLength / groupSize) - 1;
  if (index > 0) index--;
  else index = 0;
  applyTransform();
}


  track.style.transition = "transform 600ms ease-out";

  function resetAutoplay() {
    clearTimeout(autoplayTimer);
    autoplayTimer = setTimeout(goRight, 10000);
  }

  btnRight.addEventListener("click", () => {
    goRight();
    resetAutoplay();
  });
  btnLeft.addEventListener("click", () => {
    goLeft();
    resetAutoplay();
  });

  track.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (scrollCooldown) return;
      scrollCooldown = true;

      clearTimeout(autoplayTimer);

      const cardsLength = measure();
const maxIndex = Math.ceil(cardsLength / groupSize) - 1;


      if (e.deltaY > 0) {
        if (index < maxIndex) index++;
      } else {
        if (index > 0) index--;
      }

      applyTransform();
      autoplayTimer = setTimeout(resetAutoplay, 3000);

      setTimeout(() => {
        scrollCooldown = false;
      }, 400);
    },
    { passive: false }
  );

  track.addEventListener("mouseenter", () => {
    clearTimeout(autoplayTimer);
  });
  track.addEventListener("mouseleave", resetAutoplay);

 


  measure();
applyTransform();
  resetAutoplay();

window.addEventListener("resize", () => {
  const cardsLength = measure();
  const maxIndex = Math.ceil(cardsLength / groupSize) - 1;
  if (index > maxIndex) index = maxIndex; 
  applyTransform();
});
}




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
