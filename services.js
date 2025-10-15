// Variant Switcher 
document.addEventListener("DOMContentLoaded", () => {

  const serviceButtons = document.querySelectorAll(".services__btn");
  const serviceVariants = document.querySelectorAll(".services__variant");


  function activateService(id, updateHash = true) {
    const target = document.getElementById(id);
    if (!target || !target.classList.contains("services__variant")) return;

    serviceButtons.forEach((b) => b.classList.remove("services__btn--active"));
    serviceVariants.forEach((v) =>
      v.classList.remove("services__variant--active")
    );
   
    const btn = document.querySelector(`.services__btn[data-variant="${id}"]`);
    if (btn) btn.classList.add("services__btn--active");
    target.classList.add("services__variant--active");

    if (updateHash) history.replaceState(null, "", `#${id}`);

  
    const nestedMiniVariants = target.querySelectorAll(
      ".mini-services__variant"
    );
    const hasActiveMini = Array.from(nestedMiniVariants).some((v) =>
      v.classList.contains("mini-services__variant--active")
    );
    if (nestedMiniVariants.length && !hasActiveMini) {
      const firstMini = nestedMiniVariants[0];
      if (firstMini?.id) {
       
        activateMini(firstMini.id, false);
      }
    }
  }

  function activateMini(id, updateHash = true) {
    const target = document.getElementById(id);
    if (!target || !target.classList.contains("mini-services__variant")) return;

    const parentService = target.closest(".services__variant");
    if (!parentService) return;

    const localMiniButtons = parentService.querySelectorAll(
      ".mini-services__btn"
    );
    const localMiniVariants = parentService.querySelectorAll(
      ".mini-services__variant"
    );

    localMiniButtons.forEach((b) =>
      b.classList.remove("mini-services__btn--active")
    );
    localMiniVariants.forEach((v) =>
      v.classList.remove("mini-services__variant--active")
    );

    const btn = parentService.querySelector(
      `.mini-services__btn[data-mini="${id}"]`
    );
    if (btn) btn.classList.add("mini-services__btn--active");
    target.classList.add("mini-services__variant--active");

    if (
      !parentService.classList.contains("services__variant--active") &&
      parentService.id
    ) {
      activateService(parentService.id, false);
    }

    if (updateHash) history.replaceState(null, "", `#${id}`);
  }

  const preActiveServiceBtn = document.querySelector(".services__btn--active");
  if (preActiveServiceBtn?.dataset.variant) {
    const id = preActiveServiceBtn.dataset.variant;
    const svc = document.getElementById(id);
    if (svc) svc.classList.add("services__variant--active");
  }

  const preActiveMiniBtn = document.querySelector(
    ".mini-services__btn--active"
  );
  if (preActiveMiniBtn?.dataset.mini) {
    const id = preActiveMiniBtn.dataset.mini;
    const mv = document.getElementById(id);
    if (mv) mv.classList.add("mini-services__variant--active");
  }

  // fallback for services
  if (!document.querySelector(".services__variant--active")) {
    const firstServiceBtn = serviceButtons[0];
    if (firstServiceBtn?.dataset.variant) {
      activateService(firstServiceBtn.dataset.variant, false);
    }
  }

  // fallback for mini-services
  const activeService = document.querySelector(".services__variant--active");
  if (activeService) {
    const nestedActiveMini = activeService.querySelector(
      ".mini-services__variant--active"
    );
    const nestedMini = activeService.querySelector(".mini-services__variant");
    if (!nestedActiveMini && nestedMini?.id) {
      activateMini(nestedMini.id, false);
    }
  }

  //  click handlers 
  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.variant;
      if (targetId) activateService(targetId, true);
    });
  });


  document.querySelectorAll(".mini-services__btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetId = button.dataset.mini;
      if (targetId) activateMini(targetId, true);
    });
  });

  // hash handling  
  const hash = window.location.hash.substring(1);
  if (hash) {
    const elem = document.getElementById(hash);
    if (elem) {
      if (elem.classList.contains("services__variant")) {
        activateService(hash, false);
      } else if (elem.classList.contains("mini-services__variant")) {
        const parent = elem.closest(".services__variant");
        if (parent?.id) activateService(parent.id, false);
        activateMini(hash, false);
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // --- i18next initialization ---
  i18next.init(
    {
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
            footer:
              "© 2025 Все права защищены. Национальное агентство перспективных проектов",
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
            warning_many:
              "В базе данных числятся {{count}} неоплаченных штрафов",
            warning_other:
              "В базе данных числится {{count}} неоплаченный штраф",

            violation_title: "Нарушение",
            messages: {
              v1: {
                violation:
                  "Приказ директора Национального агенства перспективных проектов Республики Узбекистан",
                term: "до 16.07.2025",
              },
              template: {
                violation: "Lorem Ipsum",
                term: "до 02.09.2025",
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
            id_reg: "Название преприятия",
            id_number: "ИНН преприятия",
            subtitle3: "Калькулятор штрафов",
            service_calculator: "Инструмент расчета штрафов",
            professional: "Проф.участники",
            issuer: "Эмитенты",
            individual: "Акционеры",
            sum_title: "Размер уставного капитала:",
            sum_number: "Введите РУК",
            date: "дд.мм.гггг",
            start_date: "Дата начала",
            end_date: "Конечная дата (крайний срок оплаты)",
            subtitle4: "Подача и отслеживание обращений физлиц и юрлиц",
            submit: "Подать обращение",
            check: "Проверить статус",
            legal_entity: "Юр. лица",
            physical_entity: "Физ. лица",
            appeal_title: "Имя (для физлица) или наименование (для юрлица)",
            appeal_title2: "Область",
            appeal_title3: "Район",
            appeal_title4: "ПИНФЛ (ИНН)",
            appeal_title5: "Номер телефона",
            appeal_name: "Введите имя (наименование)",
            appeal_select: "Выберите",
            appeal_pinfl: "Введите данные",
            appeal_mobile: "Введите телефон",
            appeal_text:
              "Прикрепите обращение (в формате Word/PDF, не более 10 мб)  ",
            appeal_btn: "Отправить",
            modal_title: "Ваша заявка отправлена!",
            modal_text:
              "Можете проверить статус вашей заявки в разделе ''Проверить статус'' ",
              modal_title2: "Спасибо за обращение!",
            modal_text2:
              "Ваша апелляция зарегистрирована и находится на рассмотрении - статус обновится после завершения проверки.  ",
            reg_text: "Регистрационный номер:",
            appeal_title6: "Регистрационный номер", 
            appeal_reg: "Введите номер обращения", 
             appeal_forget: "Забыли номер обращения?",
             appeal_check: "Проверить",
             modal_date: "Проверка занимает до 10 рабочих дней.", 
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
                violation:
                  "Order of the director of the National agency of perspective projects of the Republic of Uzbekistan",
                term: "until 16.07.2025",
              },
              v2: {
                violation:
                  "Decree of the Deputy Director of the Licensing Agency",
                term: "until 20.08.2025",
              },
              template: {
                violation: "Lorem Ipsum",
                term: "until 02.09.2025",
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
            subtitle3: "Penalty Calculator",
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
            warning:
              "Ma'lumotlar bazasida {{count}} ta to'lanmagan jarima mavjud",
            warning_one:
              "Ma'lumotlar bazasida {{count}} ta to'lanmagan jarima mavjud",
            warning_other:
              "Ma'lumotlar bazasida {{count}} ta to'lanmagan jarimalar mavjud",

            violation_title: "Qoidabuzarlik",
            messages: {
              v1: {
                violation:
                  "O'zbekiston Respublikasi istiqbolli loyihalar milliy agentligi direktorning buyrug'i",
                term: "16.07.2025 gacha",
              },
              v2: {
                violation:
                  "Litsenziyalash agentligi direktor o'rinbosarining qarori",
                term: "20.08.2025 gacha",
              },
              template: {
                violation: "Lorem Ipsum",
                term: "02.09.2025 gacha",
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
            subtitle3: "Jarima Kalkulyatori",
          },
        },
      },
    },
    (err, t) => {
      if (err) console.error("i18next init error:", err);

      // Initialize all static translations
      updateGlobalTranslations();

      // Define messages
      window.messages1 = [
        {
          violation_key: "messages.v1.violation",
          num_text: "2383",
          term_key: "messages.v1.term",
        },
        {
          violation_key: "messages.template.violation",
          num_text: "2385",
          term_key: "messages.template.term",
        },
        {
          violation_key: "messages.template.violation",
          num_text: "2385",
          term_key: "messages.template.term",
        },
        {
          violation_key: "messages.template.violation",
          num_text: "2386",
          term_key: "messages.template.term",
        },
      ];
      window.messages2 = [
        {
          violation_key: "messages.template.violation",
          num_text: "2385",
          term_key: "messages.template.term",
        },
        {
          violation_key: "messages.template.violation",
          num_text: "2386",
          term_key: "messages.template.term",
        },
      ];
      window.messages3 = [
        {
          violation_key: "messages.template.violation",
          num_text: "2385",
          term_key: "messages.template.term",
        },
      ];
      window.messages4 = [
        {
          violation_key: "messages.template.violation",
          num_text: "2385",
          term_key: "messages.template.term",
        },
        {
          violation_key: "messages.template.violation",
          num_text: "2386",
          term_key: "messages.template.term",
        },
        {
          violation_key: "messages.template.violation",
          num_text: "2386",
          term_key: "messages.template.term",
        },
      ];
      window.messages5 = [
        {
          violation_key: "messages.template.violation",
          num_text: "2385",
          term_key: "messages.template.term",
        },
        {
          violation_key: "messages.template.violation",
          num_text: "2386",
          term_key: "messages.template.term",
        },
      ];
      window.messages6 = [
        {
          violation_key: "messages.template.violation",
          num_text: "2385",
          term_key: "messages.template.term",
        },
      ];

      // Initialize message boards
      initMessageBoard(".mini-services__message-board--1", window.messages1);
      initMessageBoard(".mini-services__message-board--2", window.messages2);
      initMessageBoard(".mini-services__message-board--3", window.messages3);
      initMessageBoard(".mini-services__message-board--4", window.messages4);
      initMessageBoard(".mini-services__message-board--5", window.messages5);
      initMessageBoard(".mini-services__message-board--6", window.messages6);
    }
  );

  document.querySelectorAll(".mini-services__input").forEach((div) => {
    const key = div.dataset.i18n;

    // Set initial placeholder
    div.setAttribute("data-placeholder-text", i18next.t(key));

    // Update placeholder on language change
    i18next.on("languageChanged", () => {
      div.setAttribute("data-placeholder-text", i18next.t(key));
    });

    // Focus behavior
    div.addEventListener("focus", () => {
      const placeholder = div.getAttribute("data-placeholder-text");
      if (
        div.textContent.trim() === "" ||
        div.textContent.trim() === placeholder
      ) {
        div.textContent = "";
      }
      div.style.color = "#273c63";
    });

    // Blur behavior
    div.addEventListener("blur", () => {
      if (div.textContent.trim() === "") {
        div.innerHTML = "";
        div.style.color = "#999";
      }
    });
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

        // Russian pluralization
        const isOne = mod10 === 1 && mod100 !== 11;
        const isFew = mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14);
        const isMany = !isOne && !isFew;

        if (isOne && tExists("warning_one")) return t("warning_one", { count });
        if (isFew && tExists("warning_few")) return t("warning_few", { count });
        if (isMany && tExists("warning_many"))
          return t("warning_many", { count });

        // fallback if i18n keys missing
        if (isOne) return `В базе данных числится ${count} неоплаченный штраф`;
        if (isFew) return `В базе данных числятся ${count} неоплаченных штрафа`;
        return `В базе данных числятся ${count} неоплаченных штрафов`;
      }

      const key = count <= 1 ? "warning_one" : "warning_other";
      if (tExists(key)) return t(key, { count });
      return count <= 1
        ? `There is ${count} unpaid fine in the database`
        : `There are ${count} unpaid fines in the database`;
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
  window.changeLang = function (lang) {
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

  // --- Search button logic ---
(function () {

    // Mini-service boards
    const boards = document.querySelectorAll(".mini-services__message-board");
    boards.forEach(board => {
        Object.assign(board.style, {
            opacity: "0",
            display: "none",
            transition: "opacity 0.5s ease"
        });
    });

    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    document.body.appendChild(spinner);

    document.querySelectorAll(".mini-services__search").forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            if (!targetId) return;

            boards.forEach(b => {
                b.style.opacity = "0";
                b.style.display = "none";
            });

            spinner.style.display = "flex";

            setTimeout(() => {
                const targetBoard = document.getElementById(targetId);
                if (targetBoard) {
                    targetBoard.style.display = "block";
                    requestAnimationFrame(() => { targetBoard.style.opacity = "1"; });
                }
                spinner.style.display = "none";
            }, 1000);
        });
    });

    // Utility: Generate registration number
    function generateRegNumber() {
        const d = new Date();
        const yyyy = d.getFullYear().toString().slice(-2);
        const mm = ("0" + (d.getMonth() + 1)).slice(-2);
        const dd = ("0" + d.getDate()).slice(-2);
        const rand = Math.floor(1000 + Math.random() * 9000);
        return `REG-${yyyy}${mm}${dd}-${rand}`;
    }

    // Generic modal initializer
    function setupModal(openBtnId, overlayId, closeBtnId, regNumberId) {
        const openBtn = document.getElementById(openBtnId);
        const modalOverlay = document.getElementById(overlayId);
        const closeModal = document.getElementById(closeBtnId);
        if (!openBtn || !modalOverlay || !closeModal) return;

        const modalWindow = modalOverlay.querySelector(".modal-window");
        const modalTitle = modalOverlay.querySelector(".modal-title");
        const modalText = modalOverlay.querySelector(".modal-text");
        const modalRegNumber = modalOverlay.querySelector(`#${regNumberId}`);

        Object.assign(modalOverlay.style, {
            opacity: "0",
            transition: "opacity 0.3s ease",
            pointerEvents: "none"
        });

        Object.assign(modalWindow.style, {
            transform: "scale(0.95)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            opacity: "0"
        });

        function showModal() {
            spinner.style.display = "flex";
            setTimeout(() => {
                spinner.style.display = "none";
                if (modalTitle) modalTitle.textContent = i18next.t(modalOverlay.dataset.titleKey);
                if (modalText) modalText.textContent = i18next.t(modalOverlay.dataset.textKey);
                if (modalRegNumber) modalRegNumber.textContent = generateRegNumber();

                modalOverlay.classList.add("active");
                modalOverlay.style.pointerEvents = "auto";
                modalOverlay.style.opacity = "1";
                modalWindow.style.opacity = "1";
                modalWindow.style.transform = "scale(1)";
            }, 800);
        }

        function hideModal() {
            modalWindow.style.opacity = "0";
            modalWindow.style.transform = "scale(0.95)";
            modalOverlay.style.opacity = "0";
            modalOverlay.style.pointerEvents = "none";
            setTimeout(() => modalOverlay.classList.remove("active"), 300);
        }

        openBtn.addEventListener("click", showModal);
        closeModal.addEventListener("click", hideModal);
        modalOverlay.addEventListener("click", e => {
            if (e.target === modalOverlay) hideModal();
        });
    }

    // Initialize both modals
    setupModal("submitBtn", "modalOverlay", "closeModal", "modalRegNumber");
    setupModal("checkStatusBtn", "statusModalOverlay", "closeStatusModal", "statusRegNumber");

})();




});

(function () {
  const monthsContainer = document.getElementById("monthsContainer");
  const yearLabel = document.getElementById("yearLabel");
  const calendar = document.querySelector(".calendar");
  const calendarBtns = document.querySelectorAll(
    ".services__calculator-calendar"
  );
  const datePlaceholders = document.querySelectorAll(
    '.placeholder[data-i18n="date"]'
  );
  const calculatorBox =
    document.querySelector(".services__calculator-box") || document.body;
  const editables = document.querySelectorAll(".editable");

  if (
    !monthsContainer ||
    !yearLabel ||
    !calendar ||
    !calendarBtns.length ||
    !datePlaceholders.length
  )
    return;

  // Disable editing of all placeholders
  editables.forEach((el) => el.setAttribute("contenteditable", "false"));

  // Append calendar to calculatorBox and remove active class initially
  calculatorBox.appendChild(calendar);
  calendar.classList.remove("active");

  // --- Calendar data ---
  const today = new Date();
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const YEAR = now.getFullYear();
  yearLabel.textContent = YEAR;

  const MONTH_NAMES = {
    ru: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    uz: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  const WEEKDAY_NAMES = {
    ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    uz: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"],
    en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  };

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function dayIndexMonFirst(jsDay) {
    return (jsDay + 6) % 7;
  }

  function renderCalendar() {
    monthsContainer.innerHTML = "";
    const lang = localStorage.getItem("lang") || "ru";
    const monthNames = MONTH_NAMES[lang] || MONTH_NAMES.ru;
    const weekdayNames = WEEKDAY_NAMES[lang] || WEEKDAY_NAMES.ru;

    for (let m = 0; m < 12; m++) {
      const monthEl = document.createElement("div");
      monthEl.className = "month";
      monthEl.dataset.month = m;
      if (YEAR === now.getFullYear() && m > now.getMonth())
        monthEl.classList.add("future");

      const header = document.createElement("div");
      header.className = "month-header";
      header.textContent = monthNames[m];
      monthEl.appendChild(header);

      const weekdays = document.createElement("div");
      weekdays.className = "weekdays";
      weekdayNames.forEach((w) => {
        const d = document.createElement("div");
        d.textContent = w;
        weekdays.appendChild(d);
      });
      monthEl.appendChild(weekdays);

      const grid = document.createElement("div");
      grid.className = "grid";

      const firstJsDay = new Date(YEAR, m, 1).getDay();
      const firstPos = dayIndexMonFirst(firstJsDay);
      const totalCells = 42;
      const daysThisMonth = daysInMonth(YEAR, m);
      const daysPrevMonth = daysInMonth(YEAR, m - 1 < 0 ? 11 : m - 1);

      for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        cell.className = "day";
        const dayNumber = i - firstPos + 1;
        let cellDate;

        if (dayNumber <= 0) {
          const prevMonth = (m + 11) % 12;
          const prevYear = m === 0 ? YEAR - 1 : YEAR;
          const day = daysPrevMonth + dayNumber;
          cell.textContent = day;
          cell.classList.add("muted");
          cellDate = new Date(prevYear, prevMonth, day);
        } else if (dayNumber > daysThisMonth) {
          const nextMonth = (m + 1) % 12;
          const nextYear = m === 11 ? YEAR + 1 : YEAR;
          const day = dayNumber - daysThisMonth;
          cell.textContent = day;
          cell.classList.add("muted");
          cellDate = new Date(nextYear, nextMonth, day);
        } else {
          cell.textContent = dayNumber;
          cellDate = new Date(YEAR, m, dayNumber);
        }

        if (cellDate.getTime() > now.getTime()) cell.classList.add("future");
        grid.appendChild(cell);
      }

      monthEl.appendChild(grid);
      monthsContainer.appendChild(monthEl);
    }
  }

  renderCalendar();

  // --- Toggle calendar and select date per input ---
  calendarBtns.forEach((btn, i) => {
    const placeholder = datePlaceholders[i];

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      calendar.classList.toggle("active");

      const dayClickHandler = (event) => {
        const day = event.target.closest(".day");
        if (
          !day ||
          day.classList.contains("muted") ||
          day.classList.contains("future")
        )
          return;

        const monthEl = day.closest(".month");
        const year = parseInt(yearLabel.textContent, 10);
        const month = parseInt(monthEl.dataset.month, 10);
        const dayNum = parseInt(day.textContent, 10);
        const formatted = `${String(dayNum).padStart(2, "0")}.${String(
          month + 1
        ).padStart(2, "0")}.${year}`;

        placeholder.textContent = formatted;
        placeholder.style.color = "#273c63";
        calendar.classList.remove("active");

        calendar.removeEventListener("click", dayClickHandler);
      };

      calendar.addEventListener("click", dayClickHandler);
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !calendar.contains(e.target) &&
      ![...calendarBtns].some((btn) => btn.contains(e.target))
    ) {
      calendar.classList.remove("active");
    }
  });

  if (window.i18next) {
    i18next.on("languageChanged", renderCalendar);
  }
})();

const shareBtn = document.getElementById("shareBtn");
const fileInput = document.getElementById("fileInput");

shareBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const files = Array.from(fileInput.files);
  console.log("Selected files:", files);
});
