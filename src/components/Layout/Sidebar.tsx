import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Wallet,
  Users,
  Settings,
  Store
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Sales', icon: ShoppingCart, href: '/sales' },
  { name: 'Inventory', icon: Package, href: '/inventory' },
  { name: 'Finance', icon: Wallet, href: '/finance' },
  { name: 'Customers', icon: Users, href: '/customers' },
  { name: 'Settings', icon: Settings, href: '/settings' }
];

export default function Sidebar({ className = '' }: SidebarProps) {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 ${className}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Store className="w-8 h-8 text-indigo-600" />
          <span className="ml-3 text-xl font-semibold">Minha Loja</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}