import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="breadcrumbs">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {item.path ? (
            <Link to={item.path} className="breadcrumb-link">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-label">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="breadcrumb-separator"> / </span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;