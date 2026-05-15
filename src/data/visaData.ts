export type VisaNewsItem = {
  id: string;
  countryId: string;
  date: string;
  title: string;
  summary: string;
  tag?: string;
};

export type VisaTypeInfo = {
  id: string;
  name: string;
  purpose: string;
  processing: string;
  documents: string[];
  notes?: string;
};

export type CountryInfo = {
  id: string;
  flag: string;
  name: string;
  region: string;
  summary: string;
  visaTypes: VisaTypeInfo[];
};

export const visaNews: VisaNewsItem[] = [
  {
    id: "n13",
    countryId: "schengen",  // id страны из countries
    date: "2026-05-16",
    title: "Заголовок новости",
    summary: "Краткое описание для пользователя",
    tag: "сроки",  // необязательно
  },
  {
    id: "n2",
    countryId: "schengen",
    date: "2026-05-08",
    title: "Страховка: минимум 30 000 €",
    summary:
      "Полис должен покрывать все дни поездки, включая даты въезда и выезда. Для мультивизы — покрытие на первую поездку обязательно.",
    tag: "документы",
  },
  {
    id: "n3",
    countryId: "usa",
    date: "2026-05-12",
    title: "США B1/B2: интервью в посольстве",
    summary:
      "Запись через ustraveldocs.com. DS-160 заполняется заранее; фото и паспорт должны соответствовать данным анкеты. Сроки интервью зависят от города.",
    tag: "запись",
  },
  {
    id: "n4",
    countryId: "usa",
    date: "2026-05-01",
    title: "Сборы и сроки рассмотрения",
    summary:
      "MRV-взнос оплачивается до записи. После интервью паспорт обычно удерживается на 3–10 рабочих дней при одобрении.",
    tag: "оплата",
  },
  {
    id: "n5",
    countryId: "uk",
    date: "2026-05-11",
    title: "Великобритания: ETA для кратких визитов",
    summary:
      "Граждане ряда стран оформляют Electronic Travel Authorisation онлайн до вылета. Проверьте, нужна ли вам виза Visitor или ETA.",
    tag: "правила",
  },
  {
    id: "n6",
    countryId: "uk",
    date: "2026-05-05",
    title: "Счёт в банке и выписка",
    summary:
      "Для Visitor visa часто требуют выписку за 6 месяцев с движением средств. Крупные разовые зачисления лучше сопровождать пояснением.",
    tag: "документы",
  },
  {
    id: "n7",
    countryId: "uae",
    date: "2026-05-09",
    title: "ОАЭ: туристическая виза",
    summary:
      "Для многих паспортов доступна виза по прилёту или e-Visa через авиакомпанию/отель. Проверьте срок паспорта — обычно не менее 6 месяцев.",
    tag: "въезд",
  },
  {
    id: "n8",
    countryId: "thailand",
    date: "2026-05-07",
    title: "Таиланд: безвиз и продление",
    summary:
      "Срок безвиза зависит от типа паспорта. Продление в иммиграционном офисе — при наличии оснований; штампы и билеты обратно обязательны.",
    tag: "въезд",
  },
  {
    id: "n9",
    countryId: "china",
    date: "2026-05-06",
    title: "Китай: приглашение и биометрия",
    summary:
      "Туристическая виза L обычно требует маршрут, брони и приглашение/подтверждение от принимающей стороны. Биометрия в визовом центре.",
    tag: "документы",
  },
  {
    id: "n10",
    countryId: "japan",
    date: "2026-05-04",
    title: "Япония: спонсор и маршрут",
    summary:
      "Нужен детальный план по дням, брони жилья, справка с работы. Спонсорское письмо — если оплачивает третье лицо.",
    tag: "подача",
  },
  {
    id: "n11",
    countryId: "turkey",
    date: "2026-05-03",
    title: "Турция: e-Visa и безвиз",
    summary:
      "Для граждан РФ действует безвиз на срок до 60 дней в зависимости от цели. e-Visa на сайте МИД Турции — для паспортов других стран.",
    tag: "въезд",
  },
  {
    id: "n12",
    countryId: "canada",
    date: "2026-05-02",
    title: "Канада: TRV и биометрия",
    summary:
      "Заявка через IRCC Portal, биометрия в VFS. Нужны финансы, связи со страной проживания, цель поездки.",
    tag: "подача",
  },
];

export const countries: CountryInfo[] = [
  {
    id: "schengen",
    flag: "🇪🇺",
    name: "Шенген (ЕС)",
    region: "Европа",
    summary: "Краткосрочная виза категории C до 90 дней в зоне Шенгена за полгода.",
    visaTypes: [
      {
        id: "tourist",
        name: "Туристическая",
        purpose: "Отдых, экскурсии",
        processing: "10–15 рабочих дней",
        documents: [
          "Загранпаспорт (срок ≥ 3 мес. после поездки, 2 чистые страницы)",
          "Анкета + фото 35×45 мм",
          "Страховка мин. 30 000 € на все дни",
          "Бронь перелёта и жилья",
          "Выписка из банка / спонсорство",
          "Справка с работы или выписка из вуза",
          "Копии внутреннего паспорта и прошлых виз",
        ],
        notes: "Подача в консульство страны основной цели или длительного пребывания.",
      },
      {
        id: "business",
        name: "Деловая",
        purpose: "Встречи, переговоры, конференции",
        processing: "10–20 рабочих дней",
        documents: [
          "Все документы туристической визы",
          "Приглашение от компании в ЕС",
          "Письмо работодателя о цели командировки",
          "Выписка по счёту компании (если оплачивает работодатель)",
        ],
      },
    ],
  },
  {
    id: "usa",
    flag: "🇺🇸",
    name: "США",
    region: "Северная Америка",
    summary: "Невизовая иммиграционная виза B1/B2 — туризм и деловые визиты.",
    visaTypes: [
      {
        id: "b1b2",
        name: "B1/B2",
        purpose: "Туризм, лечение, деловые встречи без работы в США",
        processing: "От даты интервью + 3–10 дней на паспорт",
        documents: [
          "Загранпаспорт",
          "Подтверждение записи DS-160",
          "Фото 5×5 см (требования CEAC)",
          "Справка с работы / учёбы",
          "Выписка из банка",
          "Сведения о поездках (маршрут, брони)",
          "Документы о семейных связях в стране проживания",
        ],
        notes: "Интервью в посольстве/консульстве обязательно для большинства заявителей.",
      },
    ],
  },
  {
    id: "uk",
    flag: "🇬🇧",
    name: "Великобритания",
    region: "Европа",
    summary: "Standard Visitor visa для туризма и кратких визитов.",
    visaTypes: [
      {
        id: "visitor",
        name: "Standard Visitor",
        purpose: "Туризм, гости, короткие курсы",
        processing: "3–6 недель (стандарт)",
        documents: [
          "Загранпаспорт",
          "Анкета онлайн + оплата IHS (если требуется)",
          "Финансы: выписка 6 мес.",
          "План поездки, брони",
          "Справка с работы",
          "Семейные документы (свидетельства, если едете с семьёй)",
        ],
        notes: "Документы загружаются в UKVI; биометрия в визовом центре.",
      },
    ],
  },
  {
    id: "uae",
    flag: "🇦🇪",
    name: "ОАЭ",
    region: "Ближний Восток",
    summary: "Туристическая виза или виза по прилёту для ряда паспортов.",
    visaTypes: [
      {
        id: "tourist",
        name: "Туристическая",
        purpose: "Отдых, шопинг",
        processing: "1–5 дней (e-Visa) или по прилёту",
        documents: [
          "Загранпаспорт (≥ 6 мес.)",
          "Бронь отеля / приглашение",
          "Билеты туда-обратно",
          "Фото для e-Visa (если оформляете заранее)",
        ],
      },
    ],
  },
  {
    id: "thailand",
    flag: "🇹🇭",
    name: "Таиланд",
    region: "Азия",
    summary: "Безвиз или виза при необходимости длительного пребывания.",
    visaTypes: [
      {
        id: "tourist",
        name: "Турист (безвиз / TR)",
        purpose: "Отдых",
        processing: "По прилёту или заранее в консульстве",
        documents: [
          "Загранпаспорт",
          "Билет обратно / в третью страну",
          "Подтверждение проживания",
          "Финансы: наличные / выписка (могут спросить на границе)",
        ],
        notes: "Срок безвиза зависит от паспорта — уточняйте на сайте MFA Thailand.",
      },
    ],
  },
  {
    id: "china",
    flag: "🇨🇳",
    name: "Китай",
    region: "Азия",
    summary: "Виза L — туризм, часто с приглашением.",
    visaTypes: [
      {
        id: "l",
        name: "Туристическая L",
        purpose: "Туризм",
        processing: "4–7 рабочих дней",
        documents: [
          "Загранпаспорт",
          "Анкета + фото",
          "Приглашение / подтверждение тура",
          "Маршрут и брони",
          "Справка с работы",
          "Выписка из банка",
        ],
      },
    ],
  },
  {
    id: "japan",
    flag: "🇯🇵",
    name: "Япония",
    region: "Азия",
    summary: "Краткосрочная виза для туризма через аккредитованные агентства или консульство.",
    visaTypes: [
      {
        id: "tourist",
        name: "Туристическая",
        purpose: "Туризм",
        processing: "5–7 рабочих дней",
        documents: [
          "Загранпаспорт",
          "Анкета, фото",
          "Маршрут по дням",
          "Брони отелей",
          "Справка с работы, 2НДФЛ",
          "Выписка из банка",
          "Свидетельство о браке / рождении детей (при поездке семьёй)",
        ],
      },
    ],
  },
  {
    id: "turkey",
    flag: "🇹🇷",
    name: "Турция",
    region: "Европа/Азия",
    summary: "Безвиз для граждан РФ на туристические поездки в рамках срока.",
    visaTypes: [
      {
        id: "visa_free",
        name: "Безвиз / e-Visa",
        purpose: "Туризм",
        processing: "По прилёту или онлайн",
        documents: [
          "Загранпаспорт",
          "Билет обратно",
          "Бронь жилья (рекомендуется)",
        ],
        notes: "Для иных гражданств — evisa.gov.tr",
      },
    ],
  },
  {
    id: "canada",
    flag: "🇨🇦",
    name: "Канада",
    region: "Северная Америка",
    summary: "Temporary Resident Visa (TRV) через IRCC.",
    visaTypes: [
      {
        id: "trv",
        name: "TRV (туризм)",
        purpose: "Туризм, гости",
        processing: "Несколько недель",
        documents: [
          "Загранпаспорт",
          "Анкета IRCC, фото",
          "Биометрия",
          "Финансы, справка с работы",
          "Связи со страной проживания",
          "Приглашение (если едете к родственникам)",
        ],
      },
    ],
  },
];

export function getCountry(id: string): CountryInfo | undefined {
  return countries.find((c) => c.id === id);
}

export function getNews(countryId?: string): VisaNewsItem[] {
  const sorted = [...visaNews].sort((a, b) => b.date.localeCompare(a.date));
  if (!countryId) return sorted;
  return sorted.filter((n) => n.countryId === countryId);
}

export function formatCountryDocumentsHtml(country: CountryInfo): string {
  const lines: string[] = [
    `${country.flag} <b>${country.name}</b>`,
    "",
    country.summary,
    "",
  ];

  for (const vt of country.visaTypes) {
    lines.push(`<b>${vt.name}</b> — ${vt.purpose}`);
    lines.push(`Срок: ${vt.processing}`);
    lines.push("<b>Документы:</b>");
    vt.documents.forEach((d, i) => lines.push(`${i + 1}. ${d}`));
    if (vt.notes) lines.push(`\n<i>${vt.notes}</i>`);
    lines.push("");
  }

  lines.push("<i>Уточняйте требования в консульстве — правила меняются.</i>");
  return lines.join("\n").slice(0, 4000);
}

export function formatNewsDigestHtml(limit = 6): string {
  const items = getNews().slice(0, limit);
  const lines = ["🌍 <b>Визовые новости</b>", ""];
  for (const n of items) {
    const c = getCountry(n.countryId);
    const flag = c?.flag ?? "•";
    lines.push(`${flag} <b>${n.title}</b> (${n.date})`);
    lines.push(n.summary);
    if (n.tag) lines.push(`<i>#${n.tag}</i>`);
    lines.push("");
  }
  lines.push("Подробнее и фильтр по странам — в Mini App → «Обновления».");
  return lines.join("\n").slice(0, 4000);
}
