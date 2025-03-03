import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  FileDown,
  ClipboardList,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface InventoryStats {
  totalValue: number;
  lowStockItems: number;
  lastMovements: number;
  stockHealth: 'good' | 'warning' | 'critical';
}

interface Product {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  costPrice: number;
  sellingPrice: number;
  category: string;
  lastPurchase: string;
  status: 'normal' | 'low' | 'critical' | 'excess';
}

export default function Inventory() {
  const { t } = useTranslation();
  // This would come from your backend in a real application
  const stats: InventoryStats = {
    totalValue: 157834.60,
    lowStockItems: 23,
    lastMovements: 12,
    stockHealth: 'warning'
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Smartphone X Pro',
      sku: 'SP-X-PRO-001',
      currentStock: 15,
      minStock: 10,
      maxStock: 30,
      costPrice: 1500,
      sellingPrice: 2499.99,
      category: 'Eletrônicos',
      lastPurchase: '2024-02-15',
      status: 'normal'
    },
    {
      id: '2',
      name: 'Fone de Ouvido Premium',
      sku: 'FO-PRE-002',
      currentStock: 5,
      minStock: 15,
      maxStock: 45,
      costPrice: 120,
      sellingPrice: 299.99,
      category: 'Acessórios',
      lastPurchase: '2024-02-20',
      status: 'critical'
    },
    {
      id: '3',
      name: 'Smartwatch Series 5',
      sku: 'SW-S5-003',
      currentStock: 8,
      minStock: 8,
      maxStock: 25,
      costPrice: 800,
      sellingPrice: 1499.99,
      category: 'Eletrônicos',
      lastPurchase: '2024-02-18',
      status: 'low'
    }
  ];

  const statusColors = {
    normal: 'bg-green-100 text-green-800',
    low: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
    excess: 'bg-blue-100 text-blue-800'
  };

  const statusLabels = {
    normal: 'Normal',
    low: 'Baixo',
    critical: 'Crítico',
    excess: 'Excedente'
  };

  const healthColors = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500'
  };

  const quickFilters = [
    { label: 'Todos os Produtos', value: 'all' },
    { label: 'Estoque Crítico', value: 'critical' },
    { label: 'Mais Vendidos', value: 'top_selling' },
    { label: 'Maior Valor', value: 'high_value' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{t('navigation.inventory')}</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <FileDown className="h-5 w-5 mr-2" />
            Exportar
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-5 w-5 mr-2" />
            Nova Entrada
          </button>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Valor Total em Estoque</h3>
            <div className={`h-2 w-2 rounded-full ${healthColors[stats.stockHealth]}`} />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(stats.totalValue)}
            </p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
              <span className="sr-only">Aumentou</span>
              8.2%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Items em Alerta</h3>
            <Link
              to="/inventory/replenish"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
            >
              Ver todos
              <ArrowRight className="inline h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.lowStockItems}</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
              <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
              <span className="sr-only">Aumentou</span>
              12%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-900">Movimentações Hoje</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.lastMovements}</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <TrendingDown className="self-center flex-shrink-0 h-4 w-4" />
              <span className="sr-only">Diminuiu</span>
              4.1%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-900">Giro de Estoque</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">1.8x</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-yellow-600">
              <BarChart3 className="self-center flex-shrink-0 h-4 w-4" />
              <span className="sr-only">Estável</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      {/* Alerts Section */}
      {stats.lowStockItems > 0 && (
        <div className="rounded-md bg-yellow-50 p-4 mb-6">
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
                  {stats.lowStockItems} produtos precisam de reposição.{' '}
                  <Link
                    to="/inventory/replenish"
                    className="font-medium underline hover:text-yellow-600"
                  >
                    Ver detalhes
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Visão Geral do Estoque</h2>
            <div className="flex space-x-3">
              {quickFilters.map((filter) => (
                <button
                  key={filter.value}
                  className="px-3 py-1 text-sm font-medium rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço de Custo
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço de Venda
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex flex-col items-end">
                        <span className="font-medium text-gray-900">
                          {product.currentStock}
                        </span>
                        <span className="text-xs text-gray-500">
                          Min: {product.minStock} / Max: {product.maxStock}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(product.costPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(product.sellingPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[product.status]
                        }`}
                      >
                        {statusLabels[product.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Plus className="h-5 w-5 mr-2" />
          Registrar Entrada
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Package className="h-5 w-5 mr-2" />
          Registrar Saída
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <ClipboardList className="h-5 w-5 mr-2" />
          Ajustar Inventário
        </button>
        <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <FileDown className="h-5 w-5 mr-2" />
          Relatório Completo
        </button>
      </div>

    </div>
  );
}