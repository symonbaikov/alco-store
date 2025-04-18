import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'bg',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // Загружаем только болгарский язык по умолчанию
    preload: ['bg'],
    // Указываем доступные языки
    supportedLngs: ['bg', 'en'],
    // Не загружаем переводы автоматически при обнаружении языка браузера
    detection: {
      order: ['localStorage', 'cookie'],
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n; 