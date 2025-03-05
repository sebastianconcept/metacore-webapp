import { useState } from 'react';
import {
  AlertTriangle,
  Package,
  DollarSign,
  Filter,
  ArrowLeft,
  Check,
  Trash2,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'alert' | 'inventory' | 'financial';
  read: boolean;
  link?: string;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
}

export default function Notifications() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  // This would come from your backend in a real application
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Estoque Crítico',
      description: 'Smartphone X Pro está com apenas 2 unidades disponíveis',
      timestamp: '2024-03-20T10:30:00',
      type: 'alert',
      read: false,
      link: '/inventory/replenishment',
      priority: 'high',
      actionRequired: true
    },
    {
      id: '2',
      title: 'Pagamento Pendente',
      description: 'Fatura do fornecedor ABC vence hoje',
      timestamp: '2024-03-20T09:15:00',
      type: 'financial',
      read: false,
      priority: 'high',
      actionRequired: true
    },
    {
      id: '3',
      title: 'Recebimento de Mercadoria',
      description: 'Pedido #789 foi entregue e aguarda conferência',
      timestamp: '2024-03-19T16:45:00',
      type: 'inventory',
      read: true,
      priority: 'medium',
      actionRequired: false
    },
    {
      id: '4',
      title: 'Novo Cliente VIP',
      description: 'Cliente João Silva atingiu status VIP',
      timestamp: '2024-03-19T14:30:00',
      type: 'alert',
      read: true,
      priority: 'low',
      actionRequired: false
    },
    {
      id: '5',
      title: 'Meta de Vendas',
      description: 'Meta diária de vendas atingida: 120% realizado',
      timestamp: '2024-03-19T12:00:00',
      type: 'financial',
      read: true,
      priority: 'low',
      actionRequired: false
    }
  ];

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

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedType !== 'all' && notification.type !== selectedType) return false;
    if (selectedStatus !== 'all' && notification.read === (selectedStatus === 'unread'))
      return false;
    if (selectedPriority !== 'all' && notification.priority !== selectedPriority)
      return false;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const actionRequiredCount = notifications.filter((n) => n.actionRequired).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Notificações</h1>
            <p className="mt-1 text-sm text-gray-500">
              {unreadCount} não lidas • {actionRequiredCount} requerem ação
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Check className="h-5 w-5 mr-2" />
            Marcar todas como lidas
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Trash2 className="h-5 w-5 mr-2" />
            Limpar todas
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="all">Todos os Tipos</option>
              <option value="alert">Alertas</option>
              <option value="inventory">Estoque</option>
              <option value="financial">Financeiro</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="all">Todos os Status</option>
              <option value="read">Lidas</option>
              <option value="unread">Não Lidas</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="all">Todas as Prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Mais Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-6 hover:bg-gray-50 ${!notification.read ? 'bg-indigo-50' : ''}`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'
                        }`}
                    >
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{notification.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(
                        notification.priority
                      )}`}
                    >
                      {notification.priority === 'high' && 'Alta'}
                      {notification.priority === 'medium' && 'Média'}
                      {notification.priority === 'low' && 'Baixa'}
                    </span>
                    {notification.actionRequired && (
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                        Ação Necessária
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="flex items-center text-xs text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTimestamp(notification.timestamp)}
                  </span>
                  {notification.link && (
                    <Link
                      to={notification.link}
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      Ver detalhes
                    </Link>
                  )}
                  {!notification.read && (
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}