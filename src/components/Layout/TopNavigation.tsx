import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, AlertTriangle, Package, DollarSign, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'alert' | 'inventory' | 'financial';
  read: boolean;
  link?: string;
}

export default function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Estoque Crítico',
      description: 'Smartphone X Pro está com apenas 2 unidades disponíveis',
      timestamp: '2024-03-20T10:30:00',
      type: 'alert',
      read: false,
      link: '/inventory/replenish'
    },
    {
      id: '2',
      title: 'Pagamento Pendente',
      description: 'Fatura do fornecedor ABC vence hoje',
      timestamp: '2024-03-20T09:15:00',
      type: 'financial',
      read: false
    },
    {
      id: '3',
      title: 'Recebimento de Mercadoria',
      description: 'Pedido #789 foi entregue e aguarda conferência',
      timestamp: '2024-03-19T16:45:00',
      type: 'inventory',
      read: true
    }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'inventory':
        return <Package className="h-5 w-5 text-indigo-500" />;
      case 'financial':
        return <DollarSign className="h-5 w-5 text-green-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `Há ${diffInMinutes} minutos`;
    if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    }
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search */}
          <div className="flex-1 min-w-0 max-w-xs">
            <form onSubmit={handleSearch} className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </form>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6" ref={dropdownRef}>
            <ThemeToggle />
            <button
              type="button"
              className={`relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isOpen ? 'bg-gray-100 text-gray-500' : ''
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
              <Bell className="h-6 w-6" />
            </button>

            {/* Notifications Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-12 w-96 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">{t('notifications.title')}</h3>
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200 max-h-[480px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 ${
                        !notification.read ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <p
                              className={`text-sm font-medium ${
                                !notification.read ? 'text-gray-900' : 'text-gray-600'
                              }`}
                            >
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {notification.description}
                          </p>
                          {notification.link && (
                            <Link
                              to={notification.link}
                              className="mt-2 text-sm text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                            >
                              Ver detalhes
                              <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <Link
                    to="/notifications"
                    className="block text-sm font-medium text-indigo-600 hover:text-indigo-900 text-center"
                  >
                    {t('notifications.viewAll')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}