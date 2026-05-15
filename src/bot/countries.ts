import { InlineKeyboard } from "grammy";
import { countries, formatCountryDocumentsHtml, getCountry } from "../data/visaData.js";
import { miniAppUrl } from "../config.js";

export function countriesListKeyboard() {
  const kb = new InlineKeyboard();
  countries.forEach((c, i) => {
    if (i > 0 && i % 2 === 0) kb.row();
    kb.text(`${c.flag} ${c.name}`, `country:${c.id}`);
  });
  kb.row().webApp("📱 Все страны в приложении", miniAppUrl("countries"));
  return kb;
}

export function countryDetailKeyboard(countryId: string) {
  return new InlineKeyboard()
    .webApp("📋 Чек-лист в приложении", miniAppUrl(`country-${countryId}`))
    .row()
    .text("← К списку стран", "countries:list")
    .text("🌍 Новости", `news:${countryId}`);
}

export function getCountryDetailText(countryId: string): string | undefined {
  const country = getCountry(countryId);
  if (!country) return undefined;
  return formatCountryDocumentsHtml(country);
}
