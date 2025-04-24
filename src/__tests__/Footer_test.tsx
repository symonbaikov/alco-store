import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

// Мокаем i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'footer.workingHours.title': 'График за обработка на поръчки:',
        'footer.workingHours.weekdays': 'Пон.-Пет. – от 9:00 до 19:00',
        'footer.workingHours.weekend': 'Съб. – Нед. – от 10:00 до 15:00',
        'footer.catalog': 'КАТАЛОГ',
        'footer.company': 'КОМПАНИЯ',
        'footer.publications': 'ПУБЛИКАЦИИ',
        'footer.help': 'ПОМОЩ',
        'footer.paymentMethods.cash': 'В брой',
        'footer.paymentMethods.mastercard': 'Mastercard',
        'footer.paymentMethods.visa': 'Visa',
        'footer.copyright.rights': '© Онлайн витрина на магазини TRAMONTI.',
        'footer.copyright.ageRestriction': 'Не продаваме алкохол на непълнолетни!',
        'footer.copyright.copyright': 'Разпространението и използването на материали от сайта е забранено!',
        'footer.copyright.resale': 'Магазинът работи само за крайния потребител, препродажбата на алкохол е забранена!',
        'footer.copyright.warning': 'Прекомерната консумация на алкохол вреди на вашето здраве!',
        'footer.links.wine': 'Вино',
        'footer.links.champagne': 'Шампанско',
        'footer.links.cognac': 'Коняк',
        'footer.links.whiskey': 'Уиски',
        'footer.links.vodka': 'Водка',
        'footer.links.liquor': 'Ликьори',
        'footer.links.tequila': 'Текила',
        'footer.links.brandy': 'Бренди',
        'footer.links.beer': 'Бира',
        'footer.links.vermouth': 'Вермути',
        'footer.links.rum': 'Ром',
        'footer.links.about': 'За нас',
        'footer.links.cooperation': 'Сътрудничество',
        'footer.links.rent': 'Наем',
        'footer.links.reviews': 'Отзиви',
        'footer.links.licenses': 'Лицензи',
        'footer.links.documents': 'Документи',
        'footer.links.requisites': 'Реквизити',
        'footer.links.contacts': 'Контакти',
        'footer.links.sommelier': 'Съвети от сомелиер',
        'footer.links.events': 'Събития',
        'footer.links.articles': 'Статии',
        'footer.links.cocktails': 'Коктейли',
        'footer.links.payment-delivery': 'Плащане и доставка',
        'footer.links.return-exchange': 'Връщане и замяна',
        'footer.links.public-offer': 'Публична оферта',
        'footer.links.privacy-policy': 'Политика за поверителност',
        'footer.links.loyalty': 'Програма за лоялност'
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Функция для установки размера viewport
function setViewportSize(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
}

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    // Сбрасываем размер viewport перед каждым тестом
    setViewportSize(1920, 1080);
  });

  it('должен корректно отображаться на десктопе', () => {
    const { container } = renderFooter();
    expect(container).toMatchSnapshot();
  });

  it('должен корректно отображаться на планшете', () => {
    setViewportSize(768, 1024);
    const { container } = renderFooter();
    expect(container).toMatchSnapshot();
  });

  it('должен корректно отображаться на мобильном', () => {
    setViewportSize(375, 667);
    const { container } = renderFooter();
    expect(container).toMatchSnapshot();
  });

  it('должен отображать все разделы в футере', () => {
    const { getByText } = renderFooter();
    
    // Проверяем наличие основных разделов
    expect(getByText('КАТАЛОГ')).toBeInTheDocument();
    expect(getByText('КОМПАНИЯ')).toBeInTheDocument();
    expect(getByText('ПУБЛИКАЦИИ')).toBeInTheDocument();
    expect(getByText('ПОМОЩ')).toBeInTheDocument();
  });

  it('должен отображать методы оплаты', () => {
    const { getByText } = renderFooter();
    
    // Проверяем наличие методов оплаты
    expect(getByText('В брой')).toBeInTheDocument();
    expect(getByText('Mastercard')).toBeInTheDocument();
    expect(getByText('Visa')).toBeInTheDocument();
  });

  it('должен отображать рабочие часы', () => {
    const { getByText } = renderFooter();
    
    expect(getByText('График за обработка на поръчки:')).toBeInTheDocument();
    expect(getByText('Пон.-Пет. – от 9:00 до 19:00')).toBeInTheDocument();
    expect(getByText('Съб. – Нед. – от 10:00 до 15:00')).toBeInTheDocument();
  });

  it('должен отображать ссылки в разделе каталога', () => {
    const { getByText } = renderFooter();
    
    expect(getByText('Вино')).toBeInTheDocument();
    expect(getByText('Шампанско')).toBeInTheDocument();
    expect(getByText('Коняк')).toBeInTheDocument();
    expect(getByText('Уиски')).toBeInTheDocument();
  });

  it('должен отображать ссылки в разделе компании', () => {
    const { getByText } = renderFooter();
    
    expect(getByText('За нас')).toBeInTheDocument();
    expect(getByText('Сътрудничество')).toBeInTheDocument();
    expect(getByText('Наем')).toBeInTheDocument();
    expect(getByText('Отзиви')).toBeInTheDocument();
  });

  it('должен отображать ссылки в разделе публикаций', () => {
    const { getByText } = renderFooter();
    
    expect(getByText('Съвети от сомелиер')).toBeInTheDocument();
    expect(getByText('Събития')).toBeInTheDocument();
    expect(getByText('Статии')).toBeInTheDocument();
    expect(getByText('Коктейли')).toBeInTheDocument();
  });

  it('должен отображать ссылки в разделе помощи', () => {
    const { getByText } = renderFooter();
    
    expect(getByText('Плащане и доставка')).toBeInTheDocument();
    expect(getByText('Връщане и замяна')).toBeInTheDocument();
    expect(getByText('Публична оферта')).toBeInTheDocument();
    expect(getByText('Политика за поверителност')).toBeInTheDocument();
  });
}); 