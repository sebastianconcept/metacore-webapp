import { useLocale } from "@/contexts/LocaleContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


interface SpendingStatsCardProps {
  title: string;
  spendingTotal?: number;
  accountsPayableCount?: number;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
}

export default function SpendingStatsCard({
  title,
  spendingTotal,
  accountsPayableCount,
  icon: Icon,
  trend
}: SpendingStatsCardProps) {
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
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>

        {spendingTotal !== undefined && formatCurrency && (
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {formatCurrency(spendingTotal)}
            </div>
            {accountsPayableCount && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{t('statsCards.spending.accountsPayable', { count: accountsPayableCount })}</span>
                <Link
                  to="/finance"
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                  {t('common.actions.viewDetails')}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}