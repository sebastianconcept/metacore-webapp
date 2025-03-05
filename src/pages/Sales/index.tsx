import React, { useState } from 'react';
import {
  Plus,
  LayoutGrid,
  LineChart,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  FileText,
  Mail,
  Printer,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Users,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesSummary {
  totalAmount: number;
  totalCount: number;
  averageTicket: number;
  growth: number;
}

interface Sale {
  id: string;
  date: string;
  customer: {
    name: string;
    id: string;
  };
  total: number;
  paymentMethod: string;
  status: 'completed' | 'cancelled' | 'processing' | 'pending';
  operator: string;
  invoice: {
    number: string;
    status: 'issued' | 'pending' | 'cancelled';
  };
  margin: number;
}

const paymentMethods = [
  'Todos',
  'Dinheiro',
  'Cartão de Crédito',
  'Cartão de Débito',
  'PIX',
  'Transferência'
];

const statusOptions = [
  'Todos',
  'Concluída',
  'Cancelada',
  'Em Processamento',
  'Pendente'
];

export default function Sales() {
  const { t, i18n } = useTranslation();
  const { currentLocale } = useLocale();

  // Sample data for charts - In a real app, this would come from your API
  const salesData = [
    { name: '00:00', gross: 1200, average: 300, net: 960 },
    { name: '03:00', gross: 900, average: 225, net: 720 },
    { name: '06:00', gross: 600, average: 200, net: 480 },
    { name: '09:00', gross: 1600, average: 320, net: 1280 },
    { name: '12:00', gross: 2400, average: 400, net: 1920 },
    { name: '15:00', gross: 2100, average: 350, net: 1680 },
    { name: '18:00', gross: 2800, average: 400, net: 2240 },
    { name: '21:00', gross: 2000, average: 333, net: 1600 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency: currentLocale === 'pt-BR' ? 'BRL' : 'USD'
    }).format(amount);
  };

  // This would come from your backend in a real application
  const summary: SalesSummary = {
    totalAmount: 15750.45,
    totalCount: 47,
    averageTicket: 335.12,
    growth: 12.5
  };

  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'activity' | 'analytics'>('activity');

  // Mock sales data
  const sales: Sale[] = [
    {
      id: 'VDA-001',
      date: '2024-03-20T14:30:00',
      customer: {
        name: 'João Silva',
        id: 'CLI-001'
      },
      total: 1250.00,
      paymentMethod: 'Cartão de Crédito',
      status: 'completed',
      operator: 'Maria Oliveira',
      invoice: {
        number: 'NF-001',
        status: 'issued'
      },
      margin: 25.5
    },
    {
      id: 'VDA-002',
      date: '2024-03-20T15:45:00',
      customer: {
        name: 'Ana Santos',
        id: 'CLI-002'
      },
      total: 750.50,
      paymentMethod: 'PIX',
      status: 'completed',
      operator: 'Pedro Costa',
      invoice: {
        number: 'NF-002',
        status: 'issued'
      },
      margin: 30.2
    },
    {
      id: 'VDA-003',
      date: '2024-03-20T16:15:00',
      customer: {
        name: 'Carlos Mendes',
        id: 'CLI-003'
      },
      total: 2500.00,
      paymentMethod: 'Cartão de Crédito',
      status: 'processing',
      operator: 'Maria Oliveira',
      invoice: {
        number: '',
        status: 'pending'
      },
      margin: 22.8
    }
  ];

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    processing: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-gray-100 text-gray-800'
  };

  const statusLabels = {
    completed: 'Concluída',
    cancelled: 'Cancelada',
    processing: 'Em Processamento',
    pending: 'Pendente'
  };

  const invoiceStatusColors = {
    issued: 'text-green-600',
    pending: 'text-yellow-600',
    cancelled: 'text-red-600'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{t('navigation.sales')}</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-5 w-5 mr-2" />
            Exportar
          </button>
          <Link
            to="/sales/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nova Venda
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Total de Vendas</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.totalAmount)}
            </p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
              {summary.growth}%
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{summary.totalCount} vendas</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Ticket Médio</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.averageTicket)}
            </p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
              8.2%
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">vs. mês anterior</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Forma de Pagamento</h3>
            <CreditCard className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-gray-900">Cartão</p>
            <p className="mt-1 text-sm text-gray-500">65% das vendas</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Margem Média</h3>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-semibold text-gray-900">32.5%</p>
            <p className="mt-1 text-sm text-gray-500">+2.1% vs. mês anterior</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('activity')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'activity'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <LayoutGrid className="inline-block h-5 w-5 mr-2" />
              Atividade
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'analytics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <LineChart className="inline-block h-5 w-5 mr-2" />
              Análise
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'analytics' ? (
            // Analytics Tab Content
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Tendência de Vendas</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value: number | bigint) =>
                        new Intl.NumberFormat(currentLocale, {
                          notation: 'compact',
                          compactDisplay: 'short',
                          style: 'currency',
                          currency: currentLocale === 'pt-BR' ? 'BRL' : 'USD'
                        }).format(value)
                      }
                    />
                    <Tooltip
                      formatter={(value: number) => [
                        new Intl.NumberFormat(currentLocale, {
                          style: 'currency',
                          currency: currentLocale === 'pt-BR' ? 'BRL' : 'USD'
                        }).format(value),
                        'Value'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="gross"
                      name="Vendas Brutas"
                      stroke="#6366F1"
                      fillOpacity={1}
                      fill="url(#colorGross)"
                    />
                    <Area
                      type="monotone"
                      dataKey="average"
                      name="Ticket Médio"
                      stroke="#10B981"
                      fillOpacity={1}
                      fill="url(#colorAverage)"
                    />
                    <Area
                      type="monotone"
                      dataKey="net"
                      name="Resultado Líquido"
                      stroke="#F59E0B"
                      fillOpacity={1}
                      fill="url(#colorNet)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            // Activity Tab Content
            <div>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Buscar por cliente, ID da venda..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="min-w-0">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    >
                      {paymentMethods.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="min-w-0">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Mais Filtros
                  </button>
                </div>
              </div>

              {/* Sales Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID/Data
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pagamento
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendedor
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        NF-e
                      </th>
                      <th className="px-6 py-3 bg-gray-50"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{sale.id}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(sale.date).toLocaleString('pt-BR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {sale.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">{sale.customer.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(sale.total)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Margem: {sale.margin.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sale.paymentMethod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[sale.status]
                              }`}
                          >
                            {statusLabels[sale.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sale.operator}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm font-medium ${invoiceStatusColors[sale.invoice.status]
                              }`}
                          >
                            {sale.invoice.number || 'Pendente'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-4">
                            <button className="text-gray-400 hover:text-gray-500">
                              <Printer className="h-5 w-5" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-500">
                              <FileText className="h-5 w-5" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-500">
                              <Mail className="h-5 w-5" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-500">
                              <MoreVertical className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Anterior
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Próxima
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Mostrando <span className="font-medium">1</span> até{' '}
                      <span className="font-medium">10</span> de{' '}
                      <span className="font-medium">97</span> resultados
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Anterior</span>
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Próxima</span>
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <FileText className="h-5 w-5 mr-2" />
          Relatório Detalhado
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Mail className="h-5 w-5 mr-2" />
          Enviar Relatório
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Printer className="h-5 w-5 mr-2" />
          Imprimir Relatório
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Download className="h-5 w-5 mr-2" />
          Exportar Dados
        </button>
      </div>
    </div>
  );
}