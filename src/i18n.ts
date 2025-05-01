import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Добавляем логирование для отладки
const logPlugin = {
  type: 'logger',
  log: (args: any) => console.log('[i18next]', args),
  warn: (args: any) => console.warn('[i18next]', args),
  error: (args: any) => console.error('[i18next]', args)
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(logPlugin)
  .init({
    fallbackLng: 'bg',
    supportedLngs: ['bg', 'en', 'ru'],
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      cookieMinutes: 160,
      cookieDomain: 'localhost'
    }
  });

// Проверяем и устанавливаем язык по умолчанию
const currentLang = localStorage.getItem('i18nextLng');
if (!currentLang || !['bg', 'en', 'ru'].includes(currentLang)) {
  console.log('[i18next] Setting default language to bg');
  i18n.changeLanguage('bg');
}

export default i18n; 