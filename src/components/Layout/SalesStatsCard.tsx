import { useLocale } from "@/contexts/LocaleContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type TimePeriod = 'today' | 'week' | 'month';

interface SalesStatsCardProps {
  grossRevenue?: number;
  netRevenue?: number;
  salesCount?: number;
  goalProgress?: number;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
}

export default function SalesStatsCard({
  grossRevenue,
  netRevenue,
  salesCount,
  goalProgress,
  icon: Icon,
}: SalesStatsCardProps) {
  const { t, i18n } = useTranslation();
  const { currentLocale } = useLocale();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('today');

  const trendColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency: currentLocale === 'pt-BR' ? 'BRL' : 'USD'
    }).format(amount);
  };

  // In a real app, these values would come from the backend based on selectedPeriod
  const periodData = {
    today: { gross: grossRevenue, net: netRevenue, count: salesCount },
    week: { gross: grossRevenue! * 7, net: netRevenue! * 7, count: salesCount! * 7 },
    month: { gross: grossRevenue! * 30, net: netRevenue! * 30, count: salesCount! * 30 }
  };

  const currentData = periodData[selectedPeriod];

  return (
    <div className="p-4 bg-white rounded-xl shadow min-h-[240px]">
      <div className="space-y-3">
        <div className="flex mr-2">
          <h3 className="grow text-lg font-semibold font-medium text-gray-600">{t('statsCards.sales.title')}</h3>
          {/* Period Selection */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setSelectedPeriod('today')}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedPeriod === 'today'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              {t('statsCards.sales.today')}
            </button>
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedPeriod === 'week'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              {t('statsCards.sales.week')}
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedPeriod === 'month'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              {t('statsCards.sales.month')}
            </button>
          </div>
        </div>

        {currentData.gross !== undefined && formatCurrency && (
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {formatCurrency(currentData.gross)}
            </div>
            {currentData.count && (
              <div className="text-sm text-gray-500">{t('statsCards.sales.sales', { count: currentData.count })}</div>
            )}
          </div>
        )}
        {goalProgress !== undefined && (<div className="flex">
          <div className="flex-2 mr-2 text-sm text-gray-500">{t('statsCards.sales.goal')}</div>
          <div className="grow mt-2 h-2 overflow-hidden bg-gray-200 rounded-full">
            <div
              className="h-full bg-indigo-600 rounded-full"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
        </div>
        )}

        {currentData.net !== undefined && formatCurrency && (
          <div className="text-sm">
            <div className="text-gray-600">{t('statsCards.sales.netTotal')}</div>
            <div className="font-medium text-gray-900">
              {formatCurrency(currentData.net)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}