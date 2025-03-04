import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import { TrendingUp, Package, AlertTriangle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Dashboard() {
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

  const customerData = [
    { name: 'Mon', new: 12, recurring: 25 },
    { name: 'Tue', new: 15, recurring: 30 },
    { name: 'Wed', new: 18, recurring: 28 },
    { name: 'Thu', new: 14, recurring: 32 },
    { name: 'Fri', new: 20, recurring: 35 },
    { name: 'Sat', new: 25, recurring: 40 },
    { name: 'Sun', new: 16, recurring: 30 }
  ];

  const getCurrentMonthKey = () => {
    const month = new Date().toLocaleString(currentLocale, { month: 'long' }).toLowerCase();
    return `${month}`;
  };

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
          grossRevenue={15750.45}
          netRevenue={12020.27}
          salesCount={47}
          goalProgress={65}
          icon={TrendingUp}
          trend="up"
          formatCurrency={formatCurrency}
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
      </div>

      {/* Alerts Section */}
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Atenção necessária
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                3 alertas precisam de sua atenção.{' '}
                <Link
                  to="/alerts"
                  className="font-medium underline hover:text-yellow-600"
                >
                  Ver detalhes
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">{t('dashboard.stats.salesTrend')}</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
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
                  name="Gross Sales"
                  stroke="#6366F1"
                  fillOpacity={1}
                  fill="url(#colorGross)"
                />
                <Area
                  type="monotone"
                  dataKey="average"
                  name="Average Ticket"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorAverage)"
                />
                <Area
                  type="monotone"
                  dataKey="net"
                  name="Net Result"
                  stroke="#F59E0B"
                  fillOpacity={1}
                  fill="url(#colorNet)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Activity Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">{t('dashboard.stats.customerActivity')}</h3>
            <div className="flex flex-col items-end text-sm space-y-1">
              <div>
                <span className="text-gray-500">New Customers Mean:</span>{' '}
                <span className="font-medium text-gray-900">
                  {(customerData.reduce((acc, curr) => acc + curr.new, 0) / customerData.length).toFixed(1)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Recurring Customers Mean:</span>{' '}
                <span className="font-medium text-gray-900">
                  {(customerData.reduce((acc, curr) => acc + curr.recurring, 0) / customerData.length).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="new" name="New Customers" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recurring" name="Recurring Customers" fill="#A5B4FC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
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
  grossRevenue?: number;
  netRevenue?: number;
  salesCount?: number;
  goalProgress?: number;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
  formatCurrency?: (amount: number) => string;
  value?: string;
  description?: React.ReactNode;
}

function StatCard({ 
  title, 
  grossRevenue, 
  netRevenue, 
  salesCount,
  goalProgress,
  icon: Icon, 
  trend,
  formatCurrency,
  value,
  description
}: StatCardProps) {
  const trendColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        
        {grossRevenue !== undefined && formatCurrency && (
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {formatCurrency(grossRevenue)}
            </div>
            {salesCount && (
              <div className="text-sm text-gray-500">{salesCount} vendas</div>
            )}
          </div>
        )}

        {value && (
          <div>
            <div className="text-2xl font-semibold text-gray-900">{value}</div>
            {description && (
              <div className="text-sm text-gray-500">{description}</div>
            )}
          </div>
        )}

        {goalProgress !== undefined && (
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full" 
              style={{ width: `${goalProgress}%` }}
            />
          </div>
        )}

        {netRevenue !== undefined && formatCurrency && (
          <div className="text-sm">
            <div className="text-gray-600">Líquido</div>
            <div className="font-medium text-gray-900">
              {formatCurrency(netRevenue)}
            </div>
          </div>
        )}
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