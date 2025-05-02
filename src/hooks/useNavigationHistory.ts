import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationItem {
  path: string;
  label: string;
}

interface PathConfig {
  label: string;
  parent?: string;
}

export const useNavigationHistory = () => {
  const [history, setHistory] = useState<NavigationItem[]>([{
    path: '/',
    label: 'navbar.home',
  }]);
  const location = useLocation();

  // Конфигурация путей с указанием родительских разделов
  const pathConfig: { [key: string]: PathConfig } = {
    '/': { label: 'navbar.home' },
    '/reviews': { label: 'navbar.reviews' },
    '/profile': { label: 'navbar.profile' },
    '/manufacturers': { label: 'navbar.manufacturers' },
    '/about': { label: 'navbar.about' },
    '/delivery': { label: 'navbar.delivery' },
    '/cooperation': { label: 'navbar.cooperation' },
    '/contacts': { label: 'navbar.contacts' },
    
    // Каталог
    '/catalog': { label: 'navbar.fullCatalog' },
    '/wine': { label: 'navbar.wine', parent: '/catalog' },
    '/strong': { label: 'navbar.strong', parent: '/catalog' },
    '/liquor': { label: 'navbar.liquor', parent: '/catalog' },
    '/drinks': { label: 'navbar.drinks', parent: '/catalog' },
    '/beer': { label: 'navbar.beer', parent: '/catalog' },
    '/snacks': { label: 'navbar.snacks', parent: '/catalog' },
    '/confectionery': { label: 'navbar.confectionery', parent: '/catalog' },
    '/sales': { label: 'navbar.sales', parent: '/catalog' },
    
    // Подкатегории
    '/wine/red': { label: 'categories.wine.red', parent: '/wine' },
    '/wine/white': { label: 'categories.wine.white', parent: '/wine' },
    '/wine/rose': { label: 'categories.wine.rose', parent: '/wine' },
    '/wine/sparkling': { label: 'categories.wine.sparkling', parent: '/wine' },
    
    '/strong/whiskey': { label: 'categories.strong.whiskey', parent: '/strong' },
    '/strong/vodka': { label: 'categories.strong.vodka', parent: '/strong' },
    '/strong/cognac': { label: 'categories.strong.cognac', parent: '/strong' },
    '/strong/brandy': { label: 'categories.strong.brandy', parent: '/strong' },
    '/strong/rum': { label: 'categories.strong.rum', parent: '/strong' },
    '/strong/tequila': { label: 'categories.strong.tequila', parent: '/strong' }
  };

  // Получить label для пути
  const getLabel = (path: string): string => {
    return pathConfig[path]?.label || path.split('/').pop() || path;
  };

  // Добавлять в историю только уникальные переходы
  useEffect(() => {
    setHistory(prev => {
      const existingIndex = prev.findIndex(item => item.path === location.pathname);
      let newHistory;
      if (existingIndex !== -1) {
        newHistory = prev.slice(0, existingIndex + 1);
      } else {
        newHistory = [
          ...prev,
          {
            path: location.pathname,
            label: getLabel(location.pathname)
          }
        ];
      }
      // Ограничиваем историю пятью последними элементами
      if (newHistory.length > 5) {
        newHistory = newHistory.slice(newHistory.length - 5);
      }
      return newHistory;
    });
    // eslint-disable-next-line
  }, [location.pathname]);

  // Функция для перехода назад по крошкам
  const goToBreadcrumb = useCallback((path: string) => {
    setHistory(prev => {
      const idx = prev.findIndex(item => item.path === path);
      let newHistory = prev;
      if (idx !== -1) {
        newHistory = prev.slice(0, idx + 1);
      }
      // Ограничиваем историю пятью последними элементами
      if (newHistory.length > 5) {
        newHistory = newHistory.slice(newHistory.length - 5);
      }
      return newHistory;
    });
  }, []);

  return [history, goToBreadcrumb] as const;
}; 