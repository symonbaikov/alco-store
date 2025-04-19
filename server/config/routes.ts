export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  WINE: '/wine',
  STRONG: '/strong',
  LIQUOR: '/liquor',
  DRINKS: '/drinks',
  BEER: '/beer',
  SNACKS: '/snacks',
  CONFECTIONERY: '/confectionery',
  SALES: '/sales',
  CONTACTS: '/contacts',
  PROFILE: '/profile',
  CART: '/cart',
  COMPARE: '/compare',
  MANUFACTURERS: '/manufacturers',
  ABOUT: '/about',
  DELIVERY: '/delivery',
  REVIEWS: '/reviews',
  COOPERATION: '/cooperation',
  NEW: '/new',
  PROMOTIONS: '/promotions'
} as const;

export const PHONE_NUMBERS = {
  KYIVSTAR: '+380979740660',
  VODAFONE: '+380509740660',
  LIFECELL: '+380938740660'
} as const;

export const LANGUAGES = {
  BULGARIAN: 'bg',
  ENGLISH: 'en'
} as const;

// Типы для TypeScript
export type RouteKeys = keyof typeof ROUTES;
export type Routes = typeof ROUTES[RouteKeys];
export type PhoneKeys = keyof typeof PHONE_NUMBERS;
export type Phones = typeof PHONE_NUMBERS[PhoneKeys];
export type LanguageKeys = keyof typeof LANGUAGES;
export type Languages = typeof LANGUAGES[LanguageKeys]; 