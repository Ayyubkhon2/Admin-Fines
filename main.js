// Select nav items and single underline
const navItems = document.querySelectorAll(".header__nav-item");
const navUnderline = document.querySelector(".header__nav-underline");

let freezeUnderline = false;
let lockTimer = null;

// Move underline under the given item
function moveUnderline(item) {
  if (!item || !navUnderline || freezeUnderline) return;

  const rect = item.getBoundingClientRect();
  const parentRect = item.parentElement.getBoundingClientRect();
  const offsetX = rect.left - parentRect.left;
  const width = rect.width;

  requestAnimationFrame(() => {
    navUnderline.style.transition = "transform 0.3s ease, width 0.3s ease, opacity 0.3s ease";
    navUnderline.style.width = `${width}px`;
    navUnderline.style.transform = `translateX(${offsetX}px)`;
    navUnderline.style.opacity = "1";
  });
}

// Set active nav item
function setActive(item) {
  if (!item) return;

  document.querySelector(".header__nav-item--active")?.classList.remove("header__nav-item--active");
  item.classList.add("header__nav-item--active");

  moveUnderline(item);
}

// Initialize click handlers for nav items
navItems.forEach(item => {
  const link = item.querySelector("a");
  if (!link) return;

  link.addEventListener("click", (e) => {
    e.preventDefault();          // Prevent default navigation
    setActive(item);             // Move underline
    setTimeout(() => {           // Delay navigation slightly for animation
      window.location.href = link.href;
    }, 50);
  });
});

// Initialize underline on page load
window.addEventListener("load", () => {
  const activeItem = document.querySelector(".header__nav-item--active");
  if (activeItem) moveUnderline(activeItem);
});

// Update underline on window resize
window.addEventListener("resize", () => {
  const activeItem = document.querySelector(".header__nav-item--active");
  if (activeItem) moveUnderline(activeItem);
});

// MutationObserver: smooth update after DOM changes (like i18next translations)
const nav = document.querySelector(".header__nav");
if (nav) {
  const observer = new MutationObserver(() => {
    freezeUnderline = true;
    clearTimeout(lockTimer);
    lockTimer = setTimeout(() => {
      freezeUnderline = false;
      const activeItem = document.querySelector(".header__nav-item--active");
      if (activeItem) moveUnderline(activeItem);
    }, 200);
  });

  observer.observe(nav, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

// Optional helper for translation updates
function updateUnderlineAfterTranslation() {
  const activeItem = document.querySelector(".header__nav-item--active");
  if (activeItem) moveUnderline(activeItem);
}








/* Reveal animation */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // Reset when it leaves viewport (so it can animate again)
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.1 }
);

reveals.forEach((el) => observer.observe(el));


/* Magnetic button */
const buttons = document.querySelectorAll(".magnetic-button");

buttons.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

/* Language dropdown */
function changeLang(lang) {
  i18next.changeLanguage(lang, () => {
    updateContent(); 
  });
}

const selectLanguageText = {
  ru: "Выберите язык",
  uz: "Tilni tanlang",
  en: "Select language",
};

function getReadableLanguage(code) {
  switch (code) {
    case "ru":
      return "Русский";
    case "uz":
      return "O‘zbekcha";
    case "en":
      return "English";
    default:
      return "Русский";
  }
}

let savedLang = localStorage.getItem("lang") || "ru";
document.documentElement.setAttribute("lang", savedLang);
let currentLanguage = getReadableLanguage(savedLang);

document.addEventListener("DOMContentLoaded", () => {
  const languageDropdown = document.querySelector(".language-dropdown");
  if (!languageDropdown) return;

  const languageBtn = languageDropdown.querySelector(".language-dropdown__btn");
  const langMenu = document.querySelector(".language-dropdown__menu");

  languageBtn.textContent = currentLanguage;
  i18next.on('initialized', () => {
  i18next.changeLanguage(savedLang, () => updateContent());
});


  // toggle dropdown
  languageBtn.addEventListener("click", () => {
    const isActive = languageDropdown.classList.toggle("active");
    languageBtn.textContent = isActive
      ? selectLanguageText[savedLang]
      : currentLanguage;
  });

  if (langMenu) {
    langMenu.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (li && li.dataset.lang) {
        savedLang = li.dataset.lang;
        currentLanguage = getReadableLanguage(savedLang);
        localStorage.setItem("lang", savedLang);

        languageBtn.textContent = currentLanguage;
        languageDropdown.classList.remove("active");
        changeLang(savedLang);
      }
    });
  }
});


  function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = i18next.t(el.getAttribute("data-i18n"));
    });
  }
/* Burger logic */
const burger = document.getElementById("burger");
const dropdown = document.getElementById("dropdown");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  dropdown.classList.toggle("active");
});

