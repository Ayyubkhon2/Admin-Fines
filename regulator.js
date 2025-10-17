document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // Mini-Regulator Switcher
  // ----------------------------
  const miniButtons = document.querySelectorAll(".mini-regulator__btn");
  const miniVariants = document.querySelectorAll(".mini-regulator__variant");

  function activateMini(id, updateHash = true) {
    const target = document.getElementById(id);
    if (!target) return;

    // Deactivate all
    miniButtons.forEach((b) =>
      b.classList.remove("mini-regulator__btn--active")
    );
    miniVariants.forEach((v) =>
      v.classList.remove("mini-regulator__variant--active")
    );

    // Activate selected
    const btn = document.querySelector(
      `.mini-regulator__btn[data-mini="${id}"]`
    );
    if (btn) btn.classList.add("mini-regulator__btn--active");
    target.classList.add("mini-regulator__variant--active");

    if (updateHash) history.replaceState(null, "", `#${id}`);
  }

  // Click handling
  miniButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetId = button.dataset.mini;
      if (targetId) activateMini(targetId);
    });
  });

  // Restore from hash or default
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash)) {
    activateMini(hash, false);
  } else {
    const firstMini = miniButtons[0];
    if (firstMini?.dataset.mini) activateMini(firstMini.dataset.mini, false);
  }

  // ----------------------------
  // i18next Initialization
  // ----------------------------
  const savedLang = localStorage.getItem("lang") || "ru";

  i18next.init(
    {
      lng: savedLang,
      fallbackLng: "ru",
      interpolation: { escapeValue: false },
      compatibilityJSON: "v3",
      resources: {
        ru: {
          translation: {
            nav1: "Главная",
            nav2: "Услуги",
            nav3: "Нормативные акты",
            cabinet: "Кабинет",
            footer:
              "© 2025 Все права защищены. Национальное агентство перспективных проектов",
            regulator_subtitle: "Нормативные документы",
            law: "Законы",
            president: "Документы Президента",
            parlament: "Постановления правительства",
            act: "Ведомственные акты",
            violation_title: "Название документа",
            num_title: "№ регистрации",
            term_title: "Дата регистрации",
            category_law: "Закон",
            category_resolution: "Постановление",
            category_order: "Указ",
            category_command: "Приказ",
            regulator: {
              v1: {
                name: `Закон Республики Узбекистан «О рынке ценных бумаг»`,
                number: "ЗРУ-387",
                date: "03.06.2015",
              },
              v2: {
                name: `Закон Республики Узбекистан «Об акционерных обществах и защите прав акционеров»`,
                number: "ЗРУ-370",
                date: "07.05.2014",
              },
              v3: {
                name: `Закон Республики Узбекистан «О биржах и биржевой деятельности»`,
                number: "ЗРУ-375",
                date: "13.03.2015",
              },
              v4: {
                name: `Постановление Президента Республики Узбекистан «О дополнительных мерах по развитию рынка капитала»`,
                number: "ПП-291",
                date: "02.09.2023",
              },
               v5: {
                name: `Постановление Президента Республики Узбекистан «О мерах по дальнейшему совершенствованию правовых основ корпоративных отношений»`,
                number: "ПП-415",
                date: "08.11.2022",
              },
                 v6: {
                name: `Постановление Президента Республики Узбекистан «О дополнительных мерах по внедрению эффективных механизмов поддержки рынка капитала»`,
                number: "ПП-90",
                date: "17.01.2022",
              },
                v7: {
                name: `Указ Президента Республики Узбекистан «О мерах по дальнейшему развитию рынка капитала»`,
                number: "УП-6207",
                date: "13.04.2021",
              },
               v8: {
                name: `Постановление Кабинета Министров Республики Узбекистан «Об утверждении Положения о порядке открытия индивидуального инвестиционного счета и учета средств на нем»`,
                number: "ПКМ-331",
                date: "13.06.2024",
              },
                v9: {
                name: `Постановление Кабинета Министров Республики Узбекистан «Об утверждении Положения о порядке дистанционной цифровой идентификации клиентов на рынке ценных бумаг»`,
                number: "ПКМ-238",
                date: "26.04.2024",
              },
              v10: {
                name: `Постановление Кабинета Министров Республики Узбекистан «О мерах по совершенствованию корпоративного управления приватизированными предприятиями»`,
                number: "ПКМ-189",
                date: "19.04.2003",
              },
              v11: {
                name: `Постановление Кабинета Министров Республики Узбекистан «О систематизации нормативных правовых актов, регулирующих оказание государственных услуг по выдаче квалификационных сертификатов»`,
                number: "ПКМ-635",
                date: "30.11.2023",
              },
               v12: {
                name: `Приказ директора Национального агентства перспективных проектов Республики Узбекистан «Об утверждении Положения о порядке осуществления выплат доходов по ценным бумагам (дивидендов, процентов) через АО «Центральный депозитарий ценных бумаг» и (или) инвестиционных посредников»`,
                number: "3523",
                date: "28.06.2024",
              },
                 v13: {
                name: `Приказ директора Национального агентства перспективных проектов Республики Узбекистан «Об утверждении Положения о порядке предоставления специального правового режима «Регуляторная песочница» в сфере рынка капитала»`,
                number: "3493",
                date: "29.01.2024",
              },
              v14: {
                name: `Приказ генерального директора Центра по координации и контролю за функционированием рынка ценных бумаг при Госкомимуществе Республики Узбекистан «Об утверждении Правил предоставления и публикации информации на рынке ценных бумаг»`,
                number: "2383",
                date: "31.07.2012",
              },
              v15: {
                name: `Приказ генерального директора Центра по координации и контролю за функционированием рынка ценных бумаг при Госкомимуществе Республики Узбекистан «Об утверждении Положения о деятельности инвестиционного консультанта на рынке ценных бумаг»`,
                number: "1495",
                date: "15.07.2005",
              },
              v16: {
                name: `Приказ генерального директора Центра по координации и контролю за функционированием рынка ценных бумаг при Госкомимуществе Республики Узбекистан «Об утверждении Положения об учетном регистре внебиржевых сделок с ценными бумагами»`,
                number: "1919",
                date: "09.03.2009",
              },
              v17: {
                name: `Приказ генерального директора Центра по координации и контролю за функционированием рынка ценных бумаг при Госкомимуществе Республики Узбекистан «Об утверждении Положения о деятельности инвестиционного посредника на рынке ценных бумаг»`,
                number: "1108",
                date: "13.03.2002",
              },
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
              regulator_subtitle: "Regulatory Documents",
law: "Laws",
president: "Presidential Documents",
parlament: "Government Resolutions",
act: "Departmental Acts",
violation_title: "Document Title",
num_title: "Registration №",
term_title: "Registration Date",
category_law: "Law",
category_resolution: "Resolution",
category_order: "Decree",
category_command: "Order",
regulator: {
  v1: {
    name: `Law of the Republic of Uzbekistan «On the Securities Market»`,
    number: "ЗРУ-387",
    date: "03.06.2015",
  },
  v2: {
    name: `Law of the Republic of Uzbekistan «On Joint Stock Companies and Protection of Shareholders’ Rights»`,
    number: "ЗРУ-370",
    date: "07.05.2014",
  },
  v3: {
    name: `Law of the Republic of Uzbekistan «On Exchanges and Exchange Activities»`,
    number: "ЗРУ-375",
    date: "13.03.2015",
  },
  v4: {
    name: `Resolution of the President of the Republic of Uzbekistan «On Additional Measures for the Development of the Capital Market»`,
    number: "ПП-291",
    date: "02.09.2023",
  },
  v5: {
    name: `Resolution of the President of the Republic of Uzbekistan «On Measures for Further Improvement of the Legal Framework of Corporate Relations»`,
    number: "ПП-415",
    date: "08.11.2022",
  },
  v6: {
    name: `Resolution of the President of the Republic of Uzbekistan «On Additional Measures to Implement Effective Mechanisms for Supporting the Capital Market»`,
    number: "ПП-90",
    date: "17.01.2022",
  },
  v7: {
    name: `Decree of the President of the Republic of Uzbekistan «On Measures for the Further Development of the Capital Market»`,
    number: "УП-6207",
    date: "13.04.2021",
  },
  v8: {
    name: `Resolution of the Cabinet of Ministers of the Republic of Uzbekistan «On Approval of the Regulation on the Procedure for Opening an Individual Investment Account and Accounting for Funds on It»`,
    number: "ПКМ-331",
    date: "13.06.2024",
  },
  v9: {
    name: `Resolution of the Cabinet of Ministers of the Republic of Uzbekistan «On Approval of the Regulation on the Procedure for Remote Digital Identification of Clients in the Securities Market»`,
    number: "ПКМ-238",
    date: "26.04.2024",
  },
  v10: {
    name: `Resolution of the Cabinet of Ministers of the Republic of Uzbekistan «On Measures to Improve Corporate Governance in Privatized Enterprises»`,
    number: "ПКМ-189",
    date: "19.04.2003",
  },
  v11: {
    name: `Resolution of the Cabinet of Ministers of the Republic of Uzbekistan «On Systematization of Regulatory Legal Acts Governing the Provision of Public Services for Issuing Qualification Certificates»`,
    number: "ПКМ-635",
    date: "30.11.2023",
  },
  v12: {
    name: `Order of the Director of the National Agency for Perspective Projects of the Republic of Uzbekistan «On Approval of the Regulation on the Procedure for Payment of Income on Securities (Dividends, Interest) through JSC “Central Securities Depository” and/or Investment Intermediaries»`,
    number: "3523",
    date: "28.06.2024",
  },
  v13: {
    name: `Order of the Director of the National Agency for Perspective Projects of the Republic of Uzbekistan «On Approval of the Regulation on the Procedure for Granting a Special Legal Regime “Regulatory Sandbox” in the Capital Market Sphere»`,
    number: "3493",
    date: "29.01.2024",
  },
  v14: {
    name: `Order of the General Director of the Center for Coordination and Control over the Functioning of the Securities Market under the State Property Committee of the Republic of Uzbekistan «On Approval of the Rules for Providing and Publishing Information in the Securities Market»`,
    number: "2383",
    date: "31.07.2012",
  },
  v15: {
    name: `Order of the General Director of the Center for Coordination and Control over the Functioning of the Securities Market under the State Property Committee of the Republic of Uzbekistan «On Approval of the Regulation on the Activities of an Investment Consultant in the Securities Market»`,
    number: "1495",
    date: "15.07.2005",
  },
  v16: {
    name: `Order of the General Director of the Center for Coordination and Control over the Functioning of the Securities Market under the State Property Committee of the Republic of Uzbekistan «On Approval of the Regulation on the Accounting Register of Over-the-Counter Transactions with Securities»`,
    number: "1919",
    date: "09.03.2009",
  },
  v17: {
    name: `Order of the General Director of the Center for Coordination and Control over the Functioning of the Securities Market under the State Property Committee of the Republic of Uzbekistan «On Approval of the Regulation on the Activities of an Investment Intermediary in the Securities Market»`,
    number: "1108",
    date: "13.03.2002",
  },
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
              regulator_subtitle: "Normativ hujjatlar",
law: "Qonunlar",
president: "Prezident hujjatlari",
parlament: "Hukumat qarorlari",
act: "Idoraviy hujjatlar",
violation_title: "Hujjat nomi",
num_title: "Ro‘yxatga olish №",
term_title: "Ro‘yxatga olingan sana",
category_law: "Qonun",
category_resolution: "Qaror",
category_order: "Farmon",
category_command: "Buyruq",
regulator: {
  v1: {
    name: `O‘zbekiston Respublikasi Qonuni «Qimmatli qog‘ozlar bozori to‘g‘risida»`,
    number: "ЗРУ-387",
    date: "03.06.2015",
  },
  v2: {
    name: `O‘zbekiston Respublikasi Qonuni «Aksiyadorlik jamiyatlari va aksiyadorlar huquqlarini himoya qilish to‘g‘risida»`,
    number: "ЗРУ-370",
    date: "07.05.2014",
  },
  v3: {
    name: `O‘zbekiston Respublikasi Qonuni «Birjalar va birja faoliyati to‘g‘risida»`,
    number: "ЗРУ-375",
    date: "13.03.2015",
  },
  v4: {
    name: `O‘zbekiston Respublikasi Prezidentining qarori «Kapital bozorini rivojlantirish bo‘yicha qo‘shimcha chora-tadbirlar to‘g‘risida»`,
    number: "ПП-291",
    date: "02.09.2023",
  },
  v5: {
    name: `O‘zbekiston Respublikasi Prezidentining qarori «Korporativ munosabatlarning huquqiy asoslarini yanada takomillashtirish chora-tadbirlari to‘g‘risida»`,
    number: "ПП-415",
    date: "08.11.2022",
  },
  v6: {
    name: `O‘zbekiston Respublikasi Prezidentining qarori «Kapital bozorini qo‘llab-quvvatlashning samarali mexanizmlarini joriy etish bo‘yicha qo‘shimcha chora-tadbirlar to‘g‘risida»`,
    number: "ПП-90",
    date: "17.01.2022",
  },
  v7: {
    name: `O‘zbekiston Respublikasi Prezidentining farmoni «Kapital bozorini yanada rivojlantirish chora-tadbirlari to‘g‘risida»`,
    number: "УП-6207",
    date: "13.04.2021",
  },
  v8: {
    name: `O‘zbekiston Respublikasi Vazirlar Mahkamasining qarori «Individual investitsiya hisob raqamini ochish va undagi mablag‘larni hisobga olish tartibi to‘g‘risidagi nizomni tasdiqlash haqida»`,
    number: "ПКМ-331",
    date: "13.06.2024",
  },
  v9: {
    name: `O‘zbekiston Respublikasi Vazirlar Mahkamasining qarori «Qimmatli qog‘ozlar bozorida mijozlarni masofaviy raqamli identifikatsiya qilish tartibi to‘g‘risidagi nizomni tasdiqlash haqida»`,
    number: "ПКМ-238",
    date: "26.04.2024",
  },
  v10: {
    name: `O‘zbekiston Respublikasi Vazirlar Mahkamasining qarori «Xususiylashtirilgan korxonalarda korporativ boshqaruvni takomillashtirish chora-tadbirlari to‘g‘risida»`,
    number: "ПКМ-189",
    date: "19.04.2003",
  },
  v11: {
    name: `O‘zbekiston Respublikasi Vazirlar Mahkamasining qarori «Malaka sertifikatlarini berish bo‘yicha davlat xizmatlarini ko‘rsatishni tartibga soluvchi normativ-huquqiy hujjatlarni tizimlashtirish to‘g‘risida»`,
    number: "ПКМ-635",
    date: "30.11.2023",
  },
  v12: {
    name: `O‘zbekiston Respublikasi Milliy istiqbolli loyihalar agentligi direktorining buyrug‘i «Qimmatli qog‘ozlar bo‘yicha daromadlarni (dividendlar, foizlar) Aksiyadorlik jamiyati “Markaziy depozitariy” va/yoki investitsiya vositachilari orqali to‘lash tartibi to‘g‘risidagi nizomni tasdiqlash haqida»`,
    number: "3523",
    date: "28.06.2024",
  },
  v13: {
    name: `O‘zbekiston Respublikasi Milliy istiqbolli loyihalar agentligi direktorining buyrug‘i «Kapital bozori sohasida “Regulyator qum qutisi” maxsus huquqiy rejimini joriy etish tartibi to‘g‘risidagi nizomni tasdiqlash haqida»`,
    number: "3493",
    date: "29.01.2024",
  },
  v14: {
    name: `O‘zbekiston Respublikasi Davlat mulki qo‘mitasi huzuridagi Qimmatli qog‘ozlar bozori faoliyatini muvofiqlashtirish va nazorat qilish markazi bosh direktori buyrug‘i «Qimmatli qog‘ozlar bozorida axborot taqdim etish va e’lon qilish qoidalarini tasdiqlash haqida»`,
    number: "2383",
    date: "31.07.2012",
  },
  v15: {
    name: `O‘zbekiston Respublikasi Davlat mulki qo‘mitasi huzuridagi Qimmatli qog‘ozlar bozori faoliyatini muvofiqlashtirish va nazorat qilish markazi bosh direktori buyrug‘i «Qimmatli qog‘ozlar bozorida investitsiya maslahatchisi faoliyati to‘g‘risidagi nizomni tasdiqlash haqida»`,
    number: "1495",
    date: "15.07.2005",
  },
  v16: {
    name: `O‘zbekiston Respublikasi Davlat mulki qo‘mitasi huzuridagi Qimmatli qog‘ozlar bozori faoliyatini muvofiqlashtirish va nazorat qilish markazi bosh direktori buyrug‘i «Qimmatli qog‘ozlar bilan birjadan tashqari bitimlarni hisobga olish reyestri to‘g‘risidagi nizomni tasdiqlash haqida»`,
    number: "1919",
    date: "09.03.2009",
  },
  v17: {
    name: `O‘zbekiston Respublikasi Davlat mulki qo‘mitasi huzuridagi Qimmatli qog‘ozlar bozori faoliyatini muvofiqlashtirish va nazorat qilish markazi bosh direktori buyrug‘i «Qimmatli qog‘ozlar bozorida investitsiya vositachisi faoliyati to‘g‘risidagi nizomni tasdiqlash haqida»`,
    number: "1108",
    date: "13.03.2002",
  },
},

          },
        },
      },
    },
    (err, t) => {
      if (err) console.error("i18next init error:", err);
      updateTranslations();
    }
  );

  function updateTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (key) el.textContent = i18next.t(key);
    });
  }
});
