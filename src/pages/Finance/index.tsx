import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  FileText,
  Plus,
  Download,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FinancialStats {
  monthlyRevenue: number;
  revenueChange: number;
  netProfit: number;
  profitMargin: number;
  cashFlow: number;
  cashFlowTrend: 'up' | 'down';
  receivables: {
    total: number;
    count: number;
  };
  payables: {
    total: number;
    count: number;
  };
}

interface FinancialKPI {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  type: 'receivable' | 'payable';
  status: 'pending' | 'overdue' | 'paid';
}

export default function Finance() {
  // This would come from your backend in a real application
  const stats: FinancialStats = {
    monthlyRevenue: 125750.00,
    revenueChange: 12.5,
    netProfit: 37725.00,
    profitMargin: 30,
    cashFlow: 52340.00,
    cashFlowTrend: 'up',
    receivables: {
      total: 45680.00,
      count: 23
    },
    payables: {
      total: 28450.00,
      count: 15
    }
  };

  const kpis: FinancialKPI[] = [
    {
      label: 'Margem Bruta',
      value: '45%',
      change: 2.5,
      trend: 'up'
    },
    {
      label: 'Margem Líquida',
      value: '30%',
      change: -1.2,
      trend: 'down'
    },
    {
      label: 'Prazo Médio de Recebimento',
      value: '15 dias',
      change: -2,
      trend: 'up'
    },
    {
      label: 'Índice de Inadimplência',
      value: '2.8%',
      change: 0.5,
      trend: 'down'
    }
  ];

  const upcomingPayments: UpcomingPayment[] = [
    {
      id: '1',
      description: 'Fatura Fornecedor ABC',
      amount: 12500.00,
      dueDate: '2024-03-25',
      type: 'payable',
      status: 'pending'
    },
    {
      id: '2',
      description: 'Cliente XYZ - Pedido #12345',
      amount: 8750.00,
      dueDate: '2024-03-22',
      type: 'receivable',
      status: 'overdue'
    },
    {
      id: '3',
      description: 'Aluguel do Estabelecimento',
      amount: 5500.00,
      dueDate: '2024-03-28',
      type: 'payable',
      status: 'pending'
    }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
    paid: 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    pending: 'Pendente',
    overdue: 'Atrasado',
    paid: 'Pago'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Finanças</h1>
        <div className="flex space-x-3">
          <Link
            to="/finance/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Novo Lançamento
          </Link>
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-5 w-5 mr-2" />
            Exportar DRE
          </button>
        </div>
      </div>

      {/* Critical Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Faturamento do Mês</h3>
            <div className={`flex items-center text-sm ${stats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.revenueChange >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {Math.abs(stats.revenueChange)}%
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(stats.monthlyRevenue)}
          </p>
          <p className="mt-1 text-sm text-gray-500">vs. mês anterior</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Lucro Líquido</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {stats.profitMargin}% margem
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(stats.netProfit)}
          </p>
          <p className="mt-1 text-sm text-gray-500">no mês atual</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Contas a Receber</h3>
            <span className="text-sm text-gray-500">{stats.receivables.count} títulos</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(stats.receivables.total)}
          </p>
          <p className="mt-1 text-sm text-gray-500">total a receber</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Contas a Pagar</h3>
            <span className="text-sm text-gray-500">{stats.payables.count} títulos</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(stats.payables.total)}
          </p>
          <p className="mt-1 text-sm text-gray-500">total a pagar</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-900">{kpi.label}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  kpi.trend === 'up'
                    ? 'text-green-600'
                    : kpi.trend === 'down'
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}
              >
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="self-center flex-shrink-0 h-4 w-4" />
                )}
                {Math.abs(kpi.change)}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Próximos Vencimentos</h2>
            <Link
              to="/finance/calendar"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
            >
              Ver Calendário Completo
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vencimento
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {payment.type === 'receivable' ? (
                          <CreditCard className="h-5 w-5 text-green-500 mr-3" />
                        ) : (
                          <Wallet className="h-5 w-5 text-red-500 mr-3" />
                        )}
                        <span className="text-sm text-gray-900">{payment.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.type === 'receivable' ? 'A Receber' : 'A Pagar'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[payment.status]
                        }`}
                      >
                        {statusLabels[payment.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <FileText className="h-5 w-5 mr-2" />
          Gerar DRE
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <DollarSign className="h-5 w-5 mr-2" />
          Nova Receita
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Calendar className="h-5 w-5 mr-2" />
          Conciliar Contas
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Download className="h-5 w-5 mr-2" />
          Exportar Relatórios
        </button>
      </div>
    </div>
  );
}