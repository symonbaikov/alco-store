const i18n = {
  changeLanguage: jest.fn(),
  language: 'bg',
  use: () => i18n,
  init: () => Promise.resolve(i18n)
};

export default i18n; 