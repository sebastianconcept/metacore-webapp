import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import SalesStatsCard from '@/components/Layout/SalesStatsCard';
import SpendingStatsCard from '@/components/Layout/SpendingStatsCard';
import ActivityTimeline from '@/components/Layout/ActivityTimeline';

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
        <SalesStatsCard
          title={t('dashboard.stats.todaySales')}
          grossRevenue={15750.45}
          netRevenue={12020.27}
          salesCount={47}
          goalProgress={65}
          icon={ChevronDown}
          trend='up'
        />
        <SpendingStatsCard
          title={t('statsCards.spending.title')}
          icon={ChevronUp}
          spendingTotal={2870.60}
          accountsPayableCount={3}
          trend="down"
        />
      </div>

      {/* Alerts Section */}
      <div className="p-4 rounded-md bg-yellow-50">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Trend Chart */}
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">{t('dashboard.stats.salesTrend')}</h3>
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
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">{t('dashboard.stats.customerActivity')}</h3>
            <div className="flex flex-col items-end space-y-1 text-sm">
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

