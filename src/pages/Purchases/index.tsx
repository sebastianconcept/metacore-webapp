import React, { useState } from 'react';
import {
    Plus,
    LayoutGrid,
    LineChart,
    Download,
    Calendar,
    TrendingUp,
    TrendingDown,
    Search,
    Filter,
    FileText,
    Mail,
    Printer,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Truck,
    Package,
    DollarSign,
    AlertTriangle,
    Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface PurchasesSummary {
    totalAmount: number;
    totalCount: number;
    averageTicket: number;
    pendingPayments: number;
    growth: number;
}

interface Purchase {
    id: string;
    date: string;
    supplier: {
        name: string;
        id: string;
    };
    total: number;
    paymentMethod: string;
    status: 'completed' | 'cancelled' | 'processing' | 'pending';
    operator: string;
    invoice: {
        number: string;
        status: 'received' | 'pending' | 'cancelled';
    };
    deliveryDate: string;
    items: number;
}

const paymentMethods = [
    'Todos',
    'Boleto',
    'Transferência',
    'Cartão Corporativo',
    'PIX',
    'Crédito 30 dias'
];

const statusOptions = [
    'Todos',
    'Concluída',
    'Cancelada',
    'Em Processamento',
    'Pendente'
];

export default function Purchases() {
    const { t } = useTranslation();
    const { currentLocale } = useLocale();
    const [activeTab, setActiveTab] = useState<'activity' | 'analytics'>('activity');

    // Sample data for charts - In a real app, this would come from your API
    const purchasesData = [
        { name: '01/03', total: 12000, average: 3000 },
        { name: '05/03', total: 9000, average: 2250 },
        { name: '10/03', total: 15000, average: 3750 },
        { name: '15/03', total: 8000, average: 2000 },
        { name: '20/03', total: 11000, average: 2750 }
    ];

    // This would come from your backend in a real application
    const summary: PurchasesSummary = {
        totalAmount: 55750.45,
        totalCount: 12,
        averageTicket: 4645.87,
        pendingPayments: 3,
        growth: -8.5
    };

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Todos');
    const [selectedStatus, setSelectedStatus] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock purchases data
    const purchases: Purchase[] = [
        {
            id: 'PED-001',
            date: '2024-03-20T14:30:00',
            supplier: {
                name: 'Tech Distributors Ltd',
                id: 'FOR-001'
            },
            total: 12500.00,
            paymentMethod: 'Boleto',
            status: 'completed',
            operator: 'Maria Oliveira',
            invoice: {
                number: 'NF-001',
                status: 'received'
            },
            deliveryDate: '2024-03-25',
            items: 45
        },
        {
            id: 'PED-002',
            date: '2024-03-20T15:45:00',
            supplier: {
                name: 'Global Electronics',
                id: 'FOR-002'
            },
            total: 8750.50,
            paymentMethod: 'PIX',
            status: 'processing',
            operator: 'Pedro Costa',
            invoice: {
                number: 'NF-002',
                status: 'pending'
            },
            deliveryDate: '2024-03-27',
            items: 23
        },
        {
            id: 'PED-003',
            date: '2024-03-20T16:15:00',
            supplier: {
                name: 'Premium Components Inc',
                id: 'FOR-003'
            },
            total: 15500.00,
            paymentMethod: 'Crédito 30 dias',
            status: 'pending',
            operator: 'Maria Oliveira',
            invoice: {
                number: '',
                status: 'pending'
            },
            deliveryDate: '2024-03-30',
            items: 67
        }
    ];

    const statusColors = {
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        processing: 'bg-yellow-100 text-yellow-800',
        pending: 'bg-gray-100 text-gray-800'
    };

    const statusLabels = {
        completed: 'Concluída',
        cancelled: 'Cancelada',
        processing: 'Em Processamento',
        pending: 'Pendente'
    };

    const invoiceStatusColors = {
        received: 'text-green-600',
        pending: 'text-yellow-600',
        cancelled: 'text-red-600'
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Compras</h1>
                <div className="flex space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <Download className="h-5 w-5 mr-2" />
                        Exportar
                    </button>
                    <Link
                        to="/purchases/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Nova Compra
                    </Link>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">Total de Compras</h3>
                        <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(summary.totalAmount)}
                        </p>
                        <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                            <TrendingDown className="self-center flex-shrink-0 h-4 w-4" />
                            {Math.abs(summary.growth)}%
                        </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{summary.totalCount} pedidos</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">Ticket Médio</h3>
                        <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(summary.averageTicket)}
                        </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">por pedido</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">Pagamentos Pendentes</h3>
                        <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="mt-2">
                        <p className="text-2xl font-semibold text-gray-900">{summary.pendingPayments}</p>
                        <p className="mt-1 text-sm text-gray-500">aguardando pagamento</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">Prazo Médio</h3>
                        <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="mt-2">
                        <p className="text-2xl font-semibold text-gray-900">15 dias</p>
                        <p className="mt-1 text-sm text-gray-500">para pagamento</p>
                    </div>
                </div>
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
                            <ul className="list-disc pl-5 space-y-1">
                                <li>3 pagamentos vencem nos próximos 5 dias</li>
                                <li>2 pedidos aguardam conferência de recebimento</li>
                                <li>1 fornecedor com pendência de documentação</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="activity" className="bg-white shadow rounded-lg">
                <div className="border-b border-gray-200 px-6 pt-4">
                    <TabsList className="w-full bg-transparent p-0 h-auto">
                        <TabsTrigger
                            value="activity"
                            className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 rounded-none pb-4"
                        >
                            <LayoutGrid className="h-5 w-5 mr-2" />
                            <span>Atividade</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="analytics"
                            className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 rounded-none pb-4"
                        >
                            <LineChart className="h-5 w-5 mr-2" />
                            <span>Análise</span>
                        </TabsTrigger>
                    </TabsList>
                </div>
                <div className="p-6">
                    <TabsContent value="analytics">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Evolução das Compras</h3>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={purchasesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
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
                                            dataKey="total"
                                            name="Total de Compras"
                                            stroke="#6366F1"
                                            fillOpacity={1}
                                            fill="url(#colorTotal)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="average"
                                            name="Média Móvel"
                                            stroke="#10B981"
                                            fillOpacity={1}
                                            fill="url(#colorAverage)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="activity">
                        <div>
                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="flex-1 min-w-0">
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Buscar por fornecedor, número do pedido..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <select
                                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={selectedPaymentMethod}
                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    >
                                        {paymentMethods.map((method) => (
                                            <option key={method} value={method}>
                                                {method}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
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

                            {/* Purchases Table */}
                            <div className="mt-6 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pedido/Data
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fornecedor
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Valor
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pagamento
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Entrega
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                NF-e
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {purchases.map((purchase) => (
                                            <tr key={purchase.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{purchase.id}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(purchase.date).toLocaleString('pt-BR')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {purchase.supplier.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{purchase.supplier.id}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {new Intl.NumberFormat('pt-BR', {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        }).format(purchase.total)}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {purchase.items} itens
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {purchase.paymentMethod}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[purchase.status]
                                                            }`}
                                                    >
                                                        {statusLabels[purchase.status]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(purchase.deliveryDate).toLocaleDateString('pt-BR')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div
                                                        className={`text-sm font-medium ${invoiceStatusColors[purchase.invoice.status]
                                                            }`}
                                                    >
                                                        {purchase.invoice.number || 'Pendente'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center space-x-4">
                                                        <button className="text-gray-400 hover:text-gray-500">
                                                            <Printer className="h-5 w-5" />
                                                        </button>
                                                        <button className="text-gray-400 hover:text-gray-500">
                                                            <FileText className="h-5 w-5" />
                                                        </button>
                                                        <button className="text-gray-400 hover:text-gray-500">
                                                            <Mail className="h-5 w-5" />
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
                                            <span className="font-medium">97</span> resultados
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
                    </TabsContent>
                </div>
            </Tabs>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <FileText className="h-5 w-5 mr-2" />
                    Relatório Detalhado
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Truck className="h-5 w-5 mr-2" />
                    Agendar Recebimento
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Package className="h-5 w-5 mr-2" />
                    Conferir Entrega
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="h-5 w-5 mr-2" />
                    Exportar Dados
                </button>
            </div>
        </div>
    );
}