import React, { useState } from 'react';
import {
  Clock,
  DollarSign,
  Package,
  User,
  FileText,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Filter,
  Calendar,
  ChevronDown,
  ShoppingCart,
  Truck,
  Settings,
  LogIn
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'financial' | 'inventory' | 'customer' | 'system';
  subtype:
    | 'sale'
    | 'payment'
    | 'expense'
    | 'invoice'
    | 'stock_in'
    | 'stock_out'
    | 'stock_adjustment'
    | 'stock_alert'
    | 'new_customer'
    | 'recurring_customer'
    | 'report'
    | 'closing'
    | 'admin'
    | 'login';
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'success' | 'warning' | 'danger' | 'info';
  user?: {
    name: string;
    role: string;
  };
  metadata?: Record<string, any>;
}

export default function Activity() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('today');
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  // This would come from your backend in a real application
  const activities: Activity[] = [
    {
      id: '1',
      type: 'financial',
      subtype: 'sale',
      title: 'Nova Venda Realizada',
      description: 'Venda #12345 para Cliente XYZ',
      timestamp: '2024-03-20T15:30:00',
      amount: 1250.50,
      trend: 'up',
      status: 'success',
      user: {
        name: 'Maria Silva',
        role: 'Vendedor'
      },
      metadata: {
        items: 3,
        paymentMethod: 'credit_card',
        invoice: 'NF-e 123456'
      }
    },
    {
      id: '2',
      type: 'inventory',
      subtype: 'stock_alert',
      title: 'Alerta de Estoque Baixo',
      description: 'Produto ABC está abaixo do mínimo',
      timestamp: '2024-03-20T15:15:00',
      status: 'warning',
      metadata: {
        product: 'Smartphone X Pro',
        currentStock: 2,
        minStock: 5
      }
    },
    {
      id: '3',
      type: 'customer',
      subtype: 'new_customer',
      title: 'Novo Cliente Cadastrado',
      description: 'João Silva realizou primeiro cadastro',
      timestamp: '2024-03-20T14:45:00',
      status: 'info',
      metadata: {
        customerType: 'PF',
        document: '123.456.789-00',
        email: 'joao.silva@email.com'
      }
    },
    {
      id: '4',
      type: 'financial',
      subtype: 'expense',
      title: 'Despesa Registrada',
      description: 'Pagamento de Fornecedor ABC',
      timestamp: '2024-03-20T14:30:00',
      amount: 3500.00,
      trend: 'down',
      status: 'info',
      metadata: {
        category: 'Fornecedores',
        paymentMethod: 'bank_transfer',
        dueDate: '2024-03-25'
      }
    },
    {
      id: '5',
      type: 'inventory',
      subtype: 'stock_in',
      title: 'Entrada de Estoque',
      description: 'Recebimento de mercadorias',
      timestamp: '2024-03-20T14:00:00',
      status: 'success',
      metadata: {
        supplier: 'Tech Distributors',
        items: 15,
        orderNumber: 'PO-789'
      }
    }
  ];

  const activityTypes = [
    { value: 'all', label: 'Todas Atividades' },
    { value: 'financial', label: 'Financeiro' },
    { value: 'inventory', label: 'Estoque' },
    { value: 'customer', label: 'Clientes' },
    { value: 'system', label: 'Sistema' }
  ];

  const periods = [
    { value: 'today', label: 'Hoje' },
    { value: 'yesterday', label: 'Ontem' },
    { value: '24h', label: 'Últimas 24h' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mês' }
  ];

  const getActivityIcon = (activity: Activity) => {
    switch (activity.subtype) {
      case 'sale':
        return <ShoppingCart className="h-5 w-5 text-green-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'expense':
        return <DollarSign className="h-5 w-5 text-red-500" />;
      case 'invoice':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'stock_in':
        return <Truck className="h-5 w-5 text-indigo-500" />;
      case 'stock_out':
        return <Package className="h-5 w-5 text-orange-500" />;
      case 'stock_adjustment':
        return <Settings className="h-5 w-5 text-gray-500" />;
      case 'stock_alert':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'new_customer':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'recurring_customer':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'login':
        return <LogIn className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'danger':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      case 'info':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Atividade Recente</h1>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
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

      {/* Activity Timeline */}
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`p-6 hover:bg-gray-50 transition-colors ${
              expandedActivity === activity.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{getActivityIcon(activity)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <div className="flex items-center space-x-4">
                    {activity.amount && (
                      <span
                        className={`inline-flex items-center text-sm ${
                          activity.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {activity.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(activity.amount)}
                      </span>
                    )}
                    {activity.status && (
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status === 'success' && 'Concluído'}
                        {activity.status === 'warning' && 'Atenção'}
                        {activity.status === 'danger' && 'Crítico'}
                        {activity.status === 'info' && 'Informação'}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                  {activity.user && (
                    <span className="text-xs text-gray-500">
                      por {activity.user.name} ({activity.user.role})
                    </span>
                  )}
                  <button
                    onClick={() =>
                      setExpandedActivity(
                        expandedActivity === activity.id ? null : activity.id
                      )
                    }
                    className="text-xs text-indigo-600 hover:text-indigo-900"
                  >
                    {expandedActivity === activity.id ? 'Menos detalhes' : 'Mais detalhes'}
                  </button>
                </div>
                {expandedActivity === activity.id && activity.metadata && (
                  <div className="mt-4 bg-gray-100 rounded-md p-4">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-xs font-medium text-gray-500 uppercase">
                            {key.replace(/_/g, ' ')}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}