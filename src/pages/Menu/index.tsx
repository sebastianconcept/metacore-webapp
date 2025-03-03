import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Package,
  Wallet,
  Users,
  Settings,
  Clock
} from 'lucide-react';

const menuItems = [
  { name: 'Vendas', icon: ShoppingCart, href: '/sales' },
  { name: 'Estoque', icon: Package, href: '/inventory' },
  { name: 'Finanças', icon: Wallet, href: '/finance' },
  { name: 'Clientes', icon: Users, href: '/customers' },
  { name: 'Atividade', icon: Clock, href: '/activity' },
  { name: 'Configurações', icon: Settings, href: '/settings' }
];

export default function Menu() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Menu</h1>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <item.icon className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}