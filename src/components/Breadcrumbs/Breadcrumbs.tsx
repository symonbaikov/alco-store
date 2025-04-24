import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { t } = useTranslation();

  return (
    <div className="breadcrumbs">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="breadcrumbs-separator">—</span>}
          {item.path ? (
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