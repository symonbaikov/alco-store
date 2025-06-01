import React from 'react';
import { useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'О компании', href: '/about' },
  { label: 'Сотрудничество', href: '/cooperation' },
  { label: 'Аренда', href: '/rent' },
  { label: 'Отзывы', href: '/reviews' },
  { label: 'Лицензии', href: '/licenses' },
  { label: 'Документы', href: '/documents' },
  { label: 'Реквизиты', href: '/requisites' },
  { label: 'Контакты', href: '/contacts' },
];

export default function SidebarMenu() {
  const location = useLocation();
  return (
    <nav className="sidebar-menu">
      <div className="menu-title">Меню</div>
      {menuItems.map(item => (
        <a
          key={item.href}
          href={item.href}
          className={
            'menu-item' + (location.pathname.startsWith(item.href) ? ' active' : '')
          }
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
} 