import { useState, useRef } from 'react';
import { Upload, Edit2, Trash2, GripVertical, Check, X, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';
import { readImageAsDataURL, validateImageFile } from '../utils/imageUpload';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id' | 'order'>) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onReorder: (productIds: string[]) => void;
}

export function AdminPanel({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onReorder,
}: AdminPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'jewelry' as Product['category'],
    imageUrl: '',
    featured: false,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) return;

    try {
      const dataUrl = await readImageAsDataURL(file);
      setFormData({ ...formData, imageUrl: dataUrl });
      setImagePreview(dataUrl);
    } catch (error) {
      console.error(error);
      alert('Failed to upload image');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.imageUrl) {
      alert('Please fill in all fields and upload an image');
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (editingId) {
      onUpdateProduct(editingId, productData);
    } else {
      onAddProduct(productData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'jewelry',
      imageUrl: '',
      featured: false,
    });
    setImagePreview(null);
    setShowForm(false);
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
      featured: product.featured,
    });
    setImagePreview(product.imageUrl);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const sortedProducts = [...products].sort((a, b) => a.order - b.order);
    const draggedIndex = sortedProducts.findIndex(p => p.id === draggedItem);
    const targetIndex = sortedProducts.findIndex(p => p.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newProducts = [...sortedProducts];
    const [removed] = newProducts.splice(draggedIndex, 1);
    newProducts.splice(targetIndex, 0, removed);

    onReorder(newProducts.map(p => p.id));
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const sortedProducts = [...products].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-gray-900">Product Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-900 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors flex items-center space-x-2"
        >
          <Upload className="h-5 w-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-amber-900">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-900">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-900 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 text-sm text-amber-900 hover:text-amber-800"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP (Max 5MB)</p>
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₦)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:border-transparent"
                  >
                    <option value="jewelry">Jewelry</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 text-amber-900 focus:ring-amber-900 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    Featured Product
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-900 focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors flex items-center space-x-2"
              >
                <Check className="h-5 w-5" />
                <span>{editingId ? 'Update' : 'Add'} Product</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Products ({products.length})
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop to reorder products
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {sortedProducts.map(product => (
            <div
              key={product.id}
              draggable
              onDragStart={() => handleDragStart(product.id)}
              onDragOver={e => handleDragOver(e, product.id)}
              onDragEnd={handleDragEnd}
              className={`p-4 hover:bg-gray-50 transition-colors cursor-move ${
                draggedItem === product.id ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <GripVertical className="h-5 w-5 text-gray-400 flex-shrink-0" />

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.category} • ${product.price.toFixed(2)}
                  </p>
                  {product.featured && (
                    <span className="inline-block mt-1 text-xs text-amber-900 bg-amber-50 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this product?')) {
                        onDeleteProduct(product.id);
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No products yet. Add your first product to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
