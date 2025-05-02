import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigationHistory } from '../../hooks/useNavigationHistory';
import { HomeIcon } from 'lucide-react';
import './Breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [navigationHistory, goToBreadcrumb] = useNavigationHistory();

  // Используем переданные items или историю навигации
  const breadcrumbItems = items || navigationHistory;

  const handleClick = (path: string, isLast: boolean) => (e: React.MouseEvent) => {
    if (isLast) {
      e.preventDefault();
      return;
    }
    goToBreadcrumb(path);
    navigate(path);
  };

  return (
    <div className="breadcrumbs">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        return (
          <React.Fragment key={item.path || index}>
            {index > 0 && <span className="breadcrumbs-separator">/</span>}
            {item.path === '/' ? (
              <Link
                to="/"
                className="breadcrumbs-link breadcrumbs-home"
                title={t('navbar.home')}
                onClick={handleClick('/', isLast)}
              >
                <HomeIcon />
              </Link>
            ) : item.path ? (
              <Link
                to={item.path}
                className={`breadcrumbs-link${isLast ? ' breadcrumbs-current' : ''}`}
                onClick={handleClick(item.path, isLast)}
                aria-current={isLast ? 'page' : undefined}
              >
                {t(item.label)}
              </Link>
            ) : (
              <span className="breadcrumbs-text">{t(item.label)}</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs; 