import { useState, useEffect } from 'react';
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
  const [history, setHistory] = useState<NavigationItem[]>([]);
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

  // Функция для получения полного пути навигации
  const getFullPath = (path: string): NavigationItem[] => {
    const result: NavigationItem[] = [];
    let currentPath = path;

    // Всегда добавляем главную страницу
    result.unshift({ path: '/', label: pathConfig['/'].label });

    while (currentPath && currentPath !== '/') {
      const config = pathConfig[currentPath];
      if (config) {
        result.push({ path: currentPath, label: config.label });
        currentPath = config.parent || '';
      } else {
        // Если путь не найден в конфигурации, добавляем его как есть
        result.push({
          path: currentPath,
          label: currentPath.split('/').pop() || currentPath
        });
        break;
      }
    }

    return result;
  };

  useEffect(() => {
    const fullPath = getFullPath(location.pathname);
    setHistory(fullPath);
  }, [location]);

  return history;
}; 