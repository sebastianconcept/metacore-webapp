import { useLocale } from "@/contexts/LocaleContext";
import { useTranslation } from "react-i18next";


interface SalesStatsCardProps {
  title: string;
  grossRevenue?: number;
  netRevenue?: number;
  salesCount?: number;
  goalProgress?: number;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
}

export default function SalesStatsCard({
  title,
  grossRevenue,
  netRevenue,
  salesCount,
  goalProgress,
  icon: Icon,
}: SalesStatsCardProps) {
  const { t, i18n } = useTranslation();
  const { currentLocale } = useLocale();
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

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>

        {grossRevenue !== undefined && formatCurrency && (
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {formatCurrency(grossRevenue)}
            </div>
            {salesCount && (
              <div className="text-sm text-gray-500">{t('statsCards.sales.sales', { count: salesCount })}</div>
            )}
          </div>
        )}
        {goalProgress !== undefined && (
          <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
            <div
              className="h-full bg-indigo-600 rounded-full"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
        )}

        {netRevenue !== undefined && formatCurrency && (
          <div className="text-sm">
            <div className="text-gray-600">{t('statsCards.sales.netTotal')}</div>
            <div className="font-medium text-gray-900">
              {formatCurrency(netRevenue)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}