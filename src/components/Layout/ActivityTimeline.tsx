import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ActivityTimeline({ formatCurrency }: { formatCurrency: (amount: number) => string }) {
  const { t } = useTranslation();

  const activities = [
    {
      id: 1,
      title: t('dashboard.activity.newSale'),
      description: t('dashboard.activity.orderAmount', {
        order: '123456',
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
                  <span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full ring-8 ring-white">
                    <Clock className="w-5 h-5 text-gray-500" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <div className="text-sm text-right text-gray-500 whitespace-nowrap">
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