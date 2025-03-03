import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  UserPlus,
  Download,
  Upload,
  Mail,
  Tag,
  FileText,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail as MailIcon,
  Calendar,
  DollarSign,
  ShoppingBag,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CustomersSummary {
  total: number;
  active: number;
  new: number;
  recurring: number;
  retentionRate: number;
}

interface Customer {
  id: string;
  name: string;
  type: 'PF' | 'PJ';
  document: string;
  email: string;
  phone: string;
  registrationDate: string;
  lastPurchase: string;
  totalPurchases: number;
  averageTicket: number;
  status: 'active' | 'inactive' | 'pending';
  location: {
    city: string;
    state: string;
  };
}

export default function Customers() {
  // This would come from your backend in a real application
  const summary: CustomersSummary = {
    total: 1234,
    active: 876,
    new: 45,
    recurring: 543,
    retentionRate: 78.5
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');

  // Mock customers data
  const customers: Customer[] = [
    {
      id: 'CLI-001',
      name: 'João Silva',
      type: 'PF',
      document: '123.456.789-00',
      email: 'joao.silva@email.com',
      phone: '(11) 98765-4321',
      registrationDate: '2024-01-15',
      lastPurchase: '2024-03-18',
      totalPurchases: 12500.00,
      averageTicket: 450.00,
      status: 'active',
      location: {
        city: 'São Paulo',
        state: 'SP'
      }
    },
    {
      id: 'CLI-002',
      name: 'Tech Solutions Ltda',
      type: 'PJ',
      document: '12.345.678/0001-90',
      email: 'contato@techsolutions.com',
      phone: '(11) 3456-7890',
      registrationDate: '2023-11-20',
      lastPurchase: '2024-03-15',
      totalPurchases: 45000.00,
      averageTicket: 1500.00,
      status: 'active',
      location: {
        city: 'Rio de Janeiro',
        state: 'RJ'
      }
    },
    {
      id: 'CLI-003',
      name: 'Maria Santos',
      type: 'PF',
      document: '987.654.321-00',
      email: 'maria.santos@email.com',
      phone: '(21) 98765-4321',
      registrationDate: '2024-02-28',
      lastPurchase: '2024-03-10',
      totalPurchases: 2800.00,
      averageTicket: 350.00,
      status: 'pending',
      location: {
        city: 'Curitiba',
        state: 'PR'
      }
    }
  ];

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };

  const statusLabels = {
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-5 w-5 mr-2" />
            Exportar
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            <UserPlus className="h-5 w-5 mr-2" />
            Novo Cliente
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Total de Clientes</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{summary.total}</p>
          <p className="mt-1 text-sm text-gray-500">cadastrados</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Clientes Ativos</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{summary.active}</p>
          <p className="mt-1 text-sm text-gray-500">últimos 90 dias</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Novos Clientes</h3>
            <UserPlus className="h-5 w-5 text-indigo-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{summary.new}</p>
          <p className="mt-1 text-sm text-gray-500">este mês</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Recorrentes</h3>
            <ShoppingBag className="h-5 w-5 text-purple-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{summary.recurring}</p>
          <p className="mt-1 text-sm text-gray-500">mais de uma compra</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Taxa de Retenção</h3>
            <DollarSign className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{summary.retentionRate}%</p>
          <p className="mt-1 text-sm text-gray-500">média mensal</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 min-w-0">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Buscar por nome, CPF/CNPJ, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>Todos os Status</option>
                <option>Ativo</option>
                <option>Inativo</option>
                <option>Pendente</option>
              </select>
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option>Todos os Tipos</option>
                <option>Pessoa Física</option>
                <option>Pessoa Jurídica</option>
              </select>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2" />
                Mais Filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localização
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cadastro
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compras
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.type === 'PF' ? 'CPF: ' : 'CNPJ: '}
                          {customer.document}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <MailIcon className="h-4 w-4 mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-1" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {customer.location.city}, {customer.location.state}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(customer.registrationDate).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-sm text-gray-500">
                      Última compra: {new Date(customer.lastPurchase).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(customer.totalPurchases)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Ticket médio:{' '}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(customer.averageTicket)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[customer.status]
                      }`}
                    >
                      {statusLabels[customer.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Mail className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <FileText className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Tag className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Anterior
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Próxima
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> até{' '}
                <span className="font-medium">10</span> de{' '}
                <span className="font-medium">{summary.total}</span> resultados
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Anterior</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Próxima</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Upload className="h-5 w-5 mr-2" />
          Importar Lista
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Mail className="h-5 w-5 mr-2" />
          Enviar Comunicação
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Tag className="h-5 w-5 mr-2" />
          Criar Segmento
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <FileText className="h-5 w-5 mr-2" />
          Relatório Completo
        </button>
      </div>
    </div>
  );
}