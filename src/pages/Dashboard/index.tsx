import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Package, AlertTriangle, Clock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Vendas Hoje"
          value={
            <div className="space-y-1">
              <p>R$ 3.240,50</p>
              <p className="text-base">Meta: R$ 5.000,00 (64.8%)</p>
            </div>
          }
          description="+12% em relação a ontem"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Novos Clientes em Março"
          value={
            <div className="space-y-1">
              <p>48 novos</p>
              <p className="text-base">156 recorrentes no mês</p>
            </div>
          }
          description="8 novos e 12 recorrentes nas últimas 24h"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Itens em Estoque"
          value="1.234"
          description={
            <div className="flex items-center space-x-2">
              <span>23 precisam de reposição</span>
              <Link
                to="/inventory/replenishment"
                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Ver Items
              </Link>
            </div>
          }
          icon={Package}
          trend="neutral"
        />
        <StatCard
          title="Alertas"
          value="3"
          description={
            <div className="flex items-center space-x-2">
              <span>2 alertas críticos</span>
              <Link
                to="/alerts"
                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Ver Alertas
              </Link>
            </div>
          }
          icon={AlertTriangle}
          trend="down"
        />
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Atividade Recente</h2>
        </div>
        <div className="p-6">
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  description: React.ReactNode;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
}

function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  const trendColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
          <div className={`mt-1 text-sm ${trendColors[trend]}`}>{description}</div>
        </div>
      </div>
    </div>
  );
}

function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      title: 'Nova venda realizada',
      description: 'Pedido #12345 - R$ 450,00',
      time: 'Há 5 minutos'
    },
    {
      id: 2,
      title: 'Estoque baixo',
      description: 'Produto X está com apenas 3 unidades',
      time: 'Há 30 minutos'
    },
    {
      id: 3,
      title: 'Novo cliente cadastrado',
      description: 'João Silva realizou cadastro',
      time: 'Há 1 hora'
    }
  ];

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index !== activities.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                    <Clock className="h-5 w-5 text-gray-500" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time>{activity.time}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}