import React from 'react';
import { Link } from 'react-router-dom';
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
  const navigationHistory = useNavigationHistory();

  // Используем переданные items или историю навигации
  const breadcrumbItems = items || navigationHistory;

  return (
    <div className="breadcrumbs">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path || index}>
          {index > 0 && <span className="breadcrumbs-separator">/</span>}
          {item.path === '/' ? (
            <Link to="/" className="breadcrumbs-link breadcrumbs-home" title={t('navbar.home')}>
              <HomeIcon />
            </Link>
          ) : item.path ? (
            <Link to={item.path} className="breadcrumbs-link">
              {t(item.label)}
            </Link>
          ) : (
            <span className="breadcrumbs-text">{t(item.label)}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs; 