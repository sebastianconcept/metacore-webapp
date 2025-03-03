import React from 'react';
import { Search as SearchIcon, Package, User, ShoppingCart, FileText, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'product' | 'customer' | 'sale' | 'document';
  title: string;
  description: string;
  metadata: Record<string, string>;
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // This would come from your backend in a real application
  const results: SearchResult[] = [
    {
      id: '1',
      type: 'product',
      title: 'Smartphone X Pro',
      description: 'Smartphone premium com 256GB',
      metadata: {
        sku: 'SP-X-PRO-001',
        stock: '15 unidades',
        price: 'R$ 2.499,99'
      }
    },
    {
      id: '2',
      type: 'customer',
      title: 'João Silva',
      description: 'Cliente desde Mar/2024',
      metadata: {
        document: 'CPF: 123.456.789-00',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321'
      }
    },
    {
      id: '3',
      type: 'sale',
      title: 'Venda #12345',
      description: 'Realizada em 20/03/2024',
      metadata: {
        total: 'R$ 3.750,00',
        status: 'Concluída',
        payment: 'Cartão de Crédito'
      }
    },
    {
      id: '4',
      type: 'document',
      title: 'NF-e 987654',
      description: 'Emitida em 20/03/2024',
      metadata: {
        status: 'Autorizada',
        value: 'R$ 1.250,00',
        customer: 'Tech Solutions Ltda'
      }
    }
  ];

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'product':
        return <Package className="h-5 w-5 text-indigo-500" />;
      case 'customer':
        return <User className="h-5 w-5 text-green-500" />;
      case 'sale':
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-orange-500" />;
    }
  };

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case 'product':
        return `/inventory/products/${result.id}`;
      case 'customer':
        return `/customers/${result.id}`;
      case 'sale':
        return `/sales/${result.id}`;
      case 'document':
        return `/documents/${result.id}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Resultados da Busca</h1>
            <p className="mt-1 text-sm text-gray-500">
              {results.length} resultados encontrados para "{query}"
            </p>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              defaultValue={query}
              placeholder="Buscar por produtos, clientes, vendas..."
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {results.map((result) => (
          <Link
            key={result.id}
            to={getResultLink(result)}
            className="block hover:bg-gray-50"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{getResultIcon(result.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{result.title}</p>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 capitalize">
                      {result.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{result.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(result.metadata).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center text-xs text-gray-500"
                      >
                        <span className="font-medium mr-1">{key}:</span> {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}