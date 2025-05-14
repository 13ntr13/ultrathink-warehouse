import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ru: {
        translation: ruTranslations
      }
    },
    fallbackLng: 'ru', // Устанавливаем русский как язык по умолчанию
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // React уже экранирует значения
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n; 