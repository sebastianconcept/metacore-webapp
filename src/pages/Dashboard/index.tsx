import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import SalesStatsCard from '@/components/Layout/SalesStatsCard';
import SpendingStatsCard from '@/components/Layout/SpendingStatsCard';
import ActivityTimeline from '@/components/Layout/ActivityTimeline';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const { currentLocale } = useLocale();

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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SalesStatsCard
          title={t('dashboard.stats.todaySales')}
          grossRevenue={15750.45}
          netRevenue={12020.40}
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

