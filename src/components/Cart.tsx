import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }: CartProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-serif text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add some beautiful items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-gray-900">Shopping Cart</h1>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to clear your cart?')) {
              onClearCart();
            }
          }}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-lg shadow p-4 flex gap-4"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {item.product.category}
                </p>
                <p className="text-lg font-serif text-amber-900">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>

                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-medium text-gray-900">
                <span>Total</span>
                <span className="text-amber-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-amber-900 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors">
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              This is a demo store. No actual purchases will be made.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
