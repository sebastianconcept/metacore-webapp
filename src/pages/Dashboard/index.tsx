import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import { TrendingUp, Users, Package, AlertTriangle, Clock } from 'lucide-react';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const { currentLocale } = useLocale();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency: currentLocale === 'pt-BR' ? 'BRL' : 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">{t('navigation.dashboard')}</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('dashboard.stats.todaySales')}
          value={
            <div className="space-y-1">
              <p>{formatCurrency(3240.50)}</p>
              <p className="text-base">
                {t('dashboard.stats.goal', {
                  amount: formatCurrency(5000.00),
                  percentage: '64.8'
                })}
              </p>
            </div>
          }
          description={t('dashboard.stats.vsYesterday', { percentage: '+12' })}
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title={t('dashboard.stats.newCustomers', { 
            month: t('common.months.march')
          })}
          value={
            <div className="space-y-1">
              <p>{t('dashboard.stats.newCount', { count: 48 })}</p>
              <p className="text-base">
                {t('dashboard.stats.recurringCount', { count: 156 })}
              </p>
            </div>
          }
          description={t('dashboard.stats.last24h', { 
            new: 8, 
            recurring: 12 
          })}
          icon={Users}
          trend="up"
        />
        <StatCard
          title={t('dashboard.stats.stockItems')}
          value="1.234"
          description={
            <div className="flex items-center space-x-2">
              <span>{t('dashboard.stats.needsReplenishment', { count: 23 })}</span>
              <Link
                to="/inventory/replenishment"
                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {t('common.actions.viewDetails')}
              </Link>
            </div>
          }
          icon={Package}
          trend="neutral"
        />
        <StatCard
          title={t('dashboard.stats.alerts')}
          value="3"
          description={
            <div className="flex items-center space-x-2">
              <span>{t('dashboard.stats.criticalAlerts', { count: 2 })}</span>
              <Link
                to="/alerts"
                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {t('common.actions.viewDetails')}
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
          <h2 className="text-lg font-medium text-gray-900">{t('dashboard.recentActivity')}</h2>
        </div>
        <div className="p-6">
          <ActivityTimeline formatCurrency={formatCurrency} />
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

function ActivityTimeline({ formatCurrency }: { formatCurrency: (amount: number) => string }) {
  const { t } = useTranslation();

  const activities = [
    {
      id: 1,
      title: t('dashboard.activity.newSale'),
      description: t('dashboard.activity.orderAmount', { 
        order: '12345', 
        amount: formatCurrency(450.00)
      }),
      time: t('common.time.minutesAgo', { count: 5 })
    },
    {
      id: 2,
      title: t('dashboard.activity.lowStock'),
      description: t('dashboard.activity.productStock', { 
        product: 'X', 
        units: 3
      }),
      time: t('common.time.minutesAgo', { count: 30 })
    },
    {
      id: 3,
      title: t('dashboard.activity.newCustomer'),
      description: t('dashboard.activity.customerRegistered', { 
        name: 'João Silva'
      }),
      time: t('common.time.hoursAgo', { count: 1 })
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