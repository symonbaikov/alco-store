// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fetchMock from 'jest-fetch-mock';

// Мокаем fetch
fetchMock.enableMocks();

// Настраиваем i18next
i18n.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
  ns: ['translations'],
  defaultNS: 'translations',
  resources: {
    ru: {
      translations: {
        'Learn More': 'Узнать больше',
        'Shop Now': 'Купить сейчас',
        'Next': 'Следующий',
        'Previous': 'Предыдущий'
      }
    }
  },
  interpolation: {
    escapeValue: false
  }
});

// Подавляем ошибки консоли в тестах
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Ошибка при загрузке категорий') || 
     args[0].includes('Ошибка при загрузке деталей категории') ||
     args[0].includes('Ошибка при проверке сессии'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

const originalReload = window.location.reload;

beforeAll(() => {
  // Mock window.location.reload
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      ...window.location,
      reload: jest.fn(), // Mock reload
    },
  });
});

afterAll(() => {
  // Restore the original reload method
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      ...window.location,
      reload: originalReload,
    },
  });
});