import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Package,
  Wallet,
  Users,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface MobileNavigationProps {
  className?: string;
}

export default function MobileNavigation({ className = '' }: MobileNavigationProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainItems = [
    { name: t('navigation.dashboard'), icon: LayoutDashboard, href: '/' },
    { name: t('navigation.sales'), icon: ShoppingCart, href: '/sales' },
    { name: t('navigation.customers'), icon: Users, href: '/customers' },
    { name: t('navigation.inventory'), icon: Package, href: '/inventory' }
  ];

  const menuItems = [
    { name: t('navigation.purchases'), icon: ShoppingBag, href: '/purchases' },
    { name: t('navigation.finance'), icon: Wallet, href: '/finance' },
    { name: t('navigation.settings'), icon: Settings, href: '/settings' }
  ];

  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)} />
      )}
      
      <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 ${className}`}>
        <div className="grid grid-cols-5 gap-1 py-2">
          {mainItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 text-xs font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="mt-1 text-center">{item.name}</span>
            </NavLink>
          ))}
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center justify-center p-2 text-xs font-medium text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-5 h-5" />
            <span className="mt-1">Menu</span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute bottom-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg rounded-t-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}