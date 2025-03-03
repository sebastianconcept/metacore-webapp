import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Alert {
  id: string;
  type: 'critical' | 'warning';
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'in_progress' | 'resolved';
}

export default function Alerts() {
  // This would come from your backend in a real application
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Falha no Backup',
      description: 'O backup automático falhou nas últimas 3 tentativas',
      timestamp: '2024-03-20T10:30:00',
      status: 'pending'
    },
    {
      id: '2',
      type: 'critical',
      title: 'Erro de Integração',
      description: 'A sincronização com o sistema de pagamento está com falha',
      timestamp: '2024-03-20T09:15:00',
      status: 'in_progress'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Performance Degradada',
      description: 'O tempo de resposta do sistema está acima do normal',
      timestamp: '2024-03-20T08:45:00',
      status: 'pending'
    }
  ];

  const statusColors = {
    pending: 'bg-red-100 text-red-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    pending: 'Pendente',
    in_progress: 'Em Andamento',
    resolved: 'Resolvido'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Alertas do Sistema</h1>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6 p-4 bg-amber-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
            <p className="text-sm text-amber-700">
              2 alertas críticos precisam de atenção imediata.
            </p>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle
                      className={`h-5 w-5 mt-1 ${
                        alert.type === 'critical' ? 'text-red-500' : 'text-amber-500'
                      }`}
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{alert.description}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleString('pt-BR')}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[alert.status]
                          }`}
                        >
                          {statusLabels[alert.status]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-900">
                    Resolver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}