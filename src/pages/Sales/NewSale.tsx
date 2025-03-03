import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  Package,
  User,
  CreditCard,
  Truck,
  FileText,
  Save,
  PauseCircle,
  X,
  Percent,
  DollarSign,
  ShoppingBag,
  Star,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  stock: number;
  unit: string;
}

interface CartItem extends Product {
  quantity: number;
  discount: number;
  total: number;
}

interface Customer {
  id: string;
  name: string;
  document: string;
  type: 'PF' | 'PJ';
  isRecurring: boolean;
}

export default function NewSale() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('money');
  const [installments, setInstallments] = useState(1);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [observation, setObservation] = useState('');

  // Mock data - In a real app, this would come from your backend
  const frequentProducts: Product[] = [
    {
      id: 'PROD-001',
      name: 'Smartphone X Pro',
      code: 'SP-X-PRO-001',
      price: 2499.99,
      stock: 15,
      unit: 'un'
    },
    {
      id: 'PROD-002',
      name: 'Fone de Ouvido Premium',
      code: 'FO-PRE-002',
      price: 299.99,
      stock: 25,
      unit: 'un'
    },
    {
      id: 'PROD-003',
      name: 'Carregador Tipo C',
      code: 'CAR-C-003',
      price: 89.99,
      stock: 50,
      unit: 'un'
    }
  ];

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * (item.price * (1 - item.discount / 100))
              }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          discount: 0,
          total: product.price
        }
      ];
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity,
              total: newQuantity * (item.price * (1 - item.discount / 100))
            }
          : item
      )
    );
  };

  const handleUpdateDiscount = (productId: string, discount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              discount,
              total: item.quantity * (item.price * (1 - discount / 100))
            }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = subtotal * (globalDiscount / 100);
  const total = subtotal - discountAmount;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Simulating barcode scanner input (usually ends with Enter key)
    if (e.key === 'Enter' && searchTerm) {
      const product = frequentProducts.find(
        (p) => p.code.toLowerCase() === searchTerm.toLowerCase()
      );
      if (product) {
        handleAddToCart(product);
        setSearchTerm('');
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] overflow-hidden">
      {/* Main Content - Left Side */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Link
              to="/sales"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Nova Venda</h1>
          </div>
          <div className="text-sm text-gray-500">
            <div>Venda #12345</div>
            <div>{new Date().toLocaleString('pt-BR')}</div>
          </div>
        </div>

        {/* Search and Quick Actions */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Buscar produto (nome, código ou código de barras)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Barcode className="h-5 w-5 mr-2" />
              Scanner
            </button>
          </div>

          {/* Frequent Products */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Produtos Frequentes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {frequentProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Package className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(product.price)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Estoque: {product.stock} {product.unit}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{item.code}</div>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)
                        }
                        className="w-16 text-center border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Desconto:</span>
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) =>
                          handleUpdateDiscount(item.id, parseFloat(e.target.value) || 0)
                        }
                        className="w-16 text-center border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-sm text-gray-500">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.price)}
                    {' x '}
                    {item.quantity}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.total)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - Right Side */}
      <div className="w-96 flex flex-col bg-gray-50 border-l border-gray-200">
        {/* Customer Selection */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Cliente</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-900">
              + Novo Cliente
            </button>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pagamento</h2>
          <div className="space-y-4">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="money">Dinheiro</option>
              <option value="credit">Cartão de Crédito</option>
              <option value="debit">Cartão de Débito</option>
              <option value="pix">PIX</option>
            </select>

            {paymentMethod === 'credit' && (
              <select
                value={installments}
                onChange={(e) => setInstallments(parseInt(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                  <option key={n} value={n}>
                    {n}x {n === 1 ? 'à vista' : 'sem juros'}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Totals */}
        <div className="p-4 border-b border-gray-200">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Desconto Global</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={globalDiscount}
                  onChange={(e) => setGlobalDiscount(parseFloat(e.target.value) || 0)}
                  className="w-16 text-right border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="text-sm text-gray-500">%</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="p-4 border-b border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                rows={3}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Adicione observações sobre a venda..."
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto p-4 space-y-3">
          <button
            type="button"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Finalizar Venda
          </button>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <PauseCircle className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}