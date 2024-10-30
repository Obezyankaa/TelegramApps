import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend"; // Библиотека для загрузки переводов


i18next
  .use(HttpBackend) // Для загрузки переводов из файлов
  .use(LanguageDetector) // Определение языка
  .use(initReactI18next) // Интеграция с React
  .init({
    fallbackLng: "en",
    debug: true,
    backend: {
      loadPath: "/translations/{{lng}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });
