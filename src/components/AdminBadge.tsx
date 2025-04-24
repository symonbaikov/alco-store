import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './AdminBadge.css';

export const AdminBadge = () => {
  const { t } = useTranslation();
  
  return (
    <div className="admin-badge">
      <FaShieldAlt />
      {t('profile.adminBadge')}
    </div>
  );
}; 