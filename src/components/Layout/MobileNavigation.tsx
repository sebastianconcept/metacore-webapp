import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  ShoppingCart,
  Scan,
  Clock,
  Menu
} from 'lucide-react';

interface MobileNavigationProps {
  className?: string;
}

const mobileNavItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'QuickSale', icon: ShoppingCart, href: '/sales/new' },
  { name: 'Scanner', icon: Scan, href: '/inventory/scanner' },
  { name: 'Activity', icon: Clock, href: '/activity' },
  { name: 'Menu', icon: Menu, href: '/menu' }
];

export default function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const { t } = useTranslation();

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 ${className}`}>
      <div className="flex items-center justify-around h-16">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 min-w-0 text-xs font-medium ${
                isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="mt-1">{t(`navigation.${item.name}`.toLowerCase())}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}