import { useState, useMemo, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  LogOut,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  AlertTriangle,
  RefreshCw,
  Database,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Product, ProductFormData, ProductType, Currency, formatPrice } from '../types/product';

const gold = '#C9A84C';
const goldLight = '#E8C96A';

const PRODUCT_TYPES: { label: string; value: ProductType }[] = [
  { label: 'Jewelry', value: 'jewelry' },
  { label: 'Clothing & Fashion', value: 'clothing' },
  { label: 'Wristwatches', value: 'wristwatch' },
  { label: 'Eyeglasses', value: 'eyeglass' },
  { label: 'Perfumes', value: 'perfume' },
];

const INITIAL_FORM: ProductFormData = {
  name: '',
  type: 'jewelry',
  category: 'Necklaces',
  description: '',
  sizes: [],
  price: 0,
  currency: 'NGN',
  image: '',
};

export default function AdminDashboard() {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { signOut, isConfigured } = useAuth();
  const {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    syncSeedProductsToCloud,
    resetToDefaults,
  } = useProducts();

  const navigate = useNavigate();

  // Filters & Search
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCurrencyFilter, setSelectedCurrencyFilter] = useState<'all' | Currency>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM);
  const [sizesInput, setSizesInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirmation state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Cloud Sync state & SQL Modal
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSqlModal, setShowSqlModal] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;

    firstInputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isModalOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  // Open modal to Add
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(INITIAL_FORM);
    setSizesInput('');
    setImagePreview('');
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open modal to Edit
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      type: product.type,
      category: product.category || '',
      description: product.description || '',
      sizes: product.sizes || [],
      price: product.price,
      currency: product.currency || 'NGN',
      image: product.image,
    });
    setSizesInput((product.sizes || []).join(', '));
    setImagePreview(product.image);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Handle Image File selection
  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setFormError(null);
    try {
      const uploadedUrl = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: uploadedUrl }));
      setImagePreview(uploadedUrl);
      showToast('Image uploaded successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Image upload failed';
      setFormError(message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Form Submit (Add or Edit)
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Please enter a product name');
      return;
    }
    if (!formData.image.trim()) {
      setFormError('Please provide an image or upload one');
      return;
    }

    setIsSaving(true);
    setFormError(null);
    const productData = {
      ...formData,
      sizes: [...new Set(sizesInput.split(',').map((size) => size.trim()).filter(Boolean))],
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        showToast(`Updated "${productData.name}" successfully!`);
      } else {
        await addProduct(productData);
        showToast(`Added "${productData.name}" successfully!`);
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save product';
      setFormError(message);
    } finally {
      setIsSaving(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      showToast(`Deleted "${productToDelete.name}"`);
      setProductToDelete(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete product';
      showToast(message);
      if (message.startsWith('Product deleted, but its image could not be removed:')) {
        setProductToDelete(null);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Seed / Sync Initial Products to Cloud
  const handleSyncToCloud = async () => {
    setIsSyncing(true);
    try {
      const res = await syncSeedProductsToCloud();
      if (res.success) {
        showToast(res.count > 0
          ? `Added ${res.count} sample products to Supabase. Existing products were left unchanged.`
          : 'Sample catalog is already synced; no duplicate products were added.');
      } else {
        showToast(`Sync failed: ${res.error || 'Check Supabase connection'}`);
      }
    } catch (e) {
      showToast('Could not sync to cloud');
    } finally {
      setIsSyncing(false);
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(search.toLowerCase()));

      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesCurrency = selectedCurrencyFilter === 'all' || item.currency === selectedCurrencyFilter;

      return matchesSearch && matchesType && matchesCurrency;
    });
  }, [products, search, selectedType, selectedCurrencyFilter]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: products.length,
      jewelry: products.filter((p) => p.type === 'jewelry').length,
      clothing: products.filter((p) => p.type === 'clothing').length,
      wristwatches: products.filter((p) => p.type === 'wristwatch').length,
      eyeglasses: products.filter((p) => p.type === 'eyeglass').length,
      perfumes: products.filter((p) => p.type === 'perfume').length,
    };
  }, [products]);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#e8dfc0' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #0e0900, #140d02)',
            border: `1px solid ${gold}`,
            color: '#fff',
            padding: '14px 22px',
            borderRadius: '10px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.8), 0 0 16px rgba(201,168,76,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.88rem',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <Sparkles size={18} style={{ color: gold }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header
        style={{
          background: '#0a0701',
          borderBottom: '1px solid rgba(201,168,76,0.18)',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#080808',
                }}
              >
                <ShoppingBag size={20} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#e8dfc0',
                    display: 'block',
                    lineHeight: 1.1,
                  }}
                >
                  Anthia & Ornaments
                </span>
                <span style={{ fontSize: '0.72rem', color: gold, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Admin Backend
                </span>
              </div>
            </Link>

            {/* Backend connection pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: 600,
                background: isConfigured ? 'rgba(34,197,94,0.12)' : 'rgba(234,179,8,0.12)',
                color: isConfigured ? '#4ade80' : '#facc15',
                border: `1px solid ${isConfigured ? 'rgba(34,197,94,0.3)' : 'rgba(234,179,8,0.3)'}`,
              }}
            >
              <Database size={12} />
              {isConfigured ? 'Supabase Live' : 'Local Storage Mode'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setShowSqlModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#c4b58e',
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
                cursor: 'pointer',
              }}
            >
              <Info size={14} />
              <span>Database SQL</span>
            </button>

            <Link
              to="/"
              target="_blank"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: gold,
                textDecoration: 'none',
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <ExternalLink size={14} />
              <span>View Store</span>
            </Link>

            <button
              onClick={handleSignOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#f87171',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                cursor: 'pointer',
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1380px', margin: '0 auto', padding: '36px 20px 80px' }}>
        {/* Banner if in Local Preview Mode */}
        {!isConfigured && (
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'linear-gradient(90deg, rgba(234,179,8,0.1), rgba(201,168,76,0.05))',
              border: '1px solid rgba(234,179,8,0.3)',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Database size={20} style={{ color: '#facc15', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#fef08a', fontSize: '0.88rem' }}>
                  Offline / Local Preview Mode Active
                </strong>
                <p style={{ fontSize: '0.8rem', color: '#ca8a04', margin: 0 }}>
                  You can upload, edit, and delete products immediately. Changes are safely preserved in browser storage. To enable cloud sync across all devices, connect your Supabase credentials in <code>.env</code>.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSqlModal(true)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#ca8a04',
                color: '#080808',
                fontWeight: 600,
                fontSize: '0.78rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Setup Supabase
            </button>
          </div>
        )}

        {/* Top Header & Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 400,
                color: '#e8dfc0',
                margin: 0,
              }}
            >
              Product Catalog Manager
            </h1>
            <p style={{ color: '#8c7d58', fontSize: '0.9rem', margin: '4px 0 0' }}>
              Upload products, edit descriptions and available sizes, and set prices in Naira or Dollars.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {isConfigured && (
              <button
                onClick={handleSyncToCloud}
                disabled={isSyncing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: 'rgba(201,168,76,0.1)',
                  color: gold,
                  border: `1px solid rgba(201,168,76,0.3)`,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: isSyncing ? 'not-allowed' : 'pointer',
                }}
              >
                <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Seed to Cloud'}</span>
              </button>
            )}

            <button
              onClick={handleOpenAdd}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
                color: '#080808',
                border: 'none',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(201,168,76,0.25)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {[
            { label: 'Total Products', value: stats.total, color: gold },
            { label: 'Jewelry Pieces', value: stats.jewelry, color: '#e8dfc0' },
            { label: 'Fashion & Clothing', value: stats.clothing, color: '#e8dfc0' },
            { label: 'Wristwatches', value: stats.wristwatches, color: '#e8dfc0' },
            { label: 'Eyeglasses', value: stats.eyeglasses, color: '#e8dfc0' },
            { label: 'Perfumes', value: stats.perfumes, color: '#e8dfc0' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: '#0e0900',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '12px',
                padding: '18px 20px',
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#8c7d58', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 600, color: stat.color, fontFamily: 'Cormorant Garamond, serif' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            background: '#0e0900',
            border: '1px solid rgba(201,168,76,0.18)',
            borderRadius: '14px',
            padding: '18px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Collection Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { label: 'All Items', value: 'all' },
              { label: 'Jewelry', value: 'jewelry' },
              { label: 'Clothing', value: 'clothing' },
              { label: 'Wristwatches', value: 'wristwatch' },
              { label: 'Eyeglasses', value: 'eyeglass' },
              { label: 'Perfumes', value: 'perfume' },
            ].map((tab) => {
              const active = selectedType === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedType(tab.value)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: active ? 'linear-gradient(135deg, #C9A84C, #E8C96A)' : 'transparent',
                    color: active ? '#080808' : '#8c7d58',
                    border: active ? 'none' : '1px solid rgba(201,168,76,0.15)',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search & Currency Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Currency selector filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {(['all', 'NGN', 'USD'] as const).map((curr) => {
                const active = selectedCurrencyFilter === curr;
                const label = curr === 'all' ? 'All Prices' : curr === 'NGN' ? '₦ Naira' : '$ USD';
                return (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrencyFilter(curr)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: active ? 'rgba(201,168,76,0.2)' : 'transparent',
                      color: active ? goldLight : '#6b5e3a',
                      border: `1px solid ${active ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '240px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b5e3a',
                }}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  background: '#080808',
                  border: '1px solid rgba(201,168,76,0.25)',
                  borderRadius: '8px',
                  color: '#e8dfc0',
                  fontSize: '0.84rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Products Table / Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#8c7d58' }}>
            <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: gold }} />
            <p>Loading catalog items...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: '#0e0900',
              border: '1px dashed rgba(201,168,76,0.2)',
              borderRadius: '16px',
            }}
          >
            <ShoppingBag size={48} style={{ color: '#6b5e3a', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#e8dfc0', marginBottom: '8px' }}>No products found</h3>
            <p style={{ fontSize: '0.86rem', color: '#8c7d58', marginBottom: '20px' }}>
              {search ? 'Try clearing your search filters' : 'Start by adding your first product to the catalog'}
            </p>
            <button
              onClick={handleOpenAdd}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
                color: '#080808',
                fontWeight: 600,
                fontSize: '0.84rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Add Product Now
            </button>
          </div>
        ) : (
          <div
            style={{
              background: '#0e0900',
              border: '1px solid rgba(201,168,76,0.18)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#0a0701', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                    <th style={{ padding: '16px 20px', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c7d58' }}>
                      Product
                    </th>
                    <th style={{ padding: '16px 20px', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c7d58' }}>
                      Collection
                    </th>
                    <th style={{ padding: '16px 20px', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c7d58' }}>
                      Category
                    </th>
                    <th style={{ padding: '16px 20px', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c7d58' }}>
                      Price
                    </th>
                    <th style={{ padding: '16px 20px', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c7d58' }}>
                      Description
                    </th>
                    <th style={{ padding: '16px 20px', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c7d58', textAlign: 'right' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: '1px solid rgba(201,168,76,0.08)',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.03)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* Product Thumbnail & Name */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="%236b5e3a"><rect width="48" height="48" fill="%231a1408"/></svg>';
                            }}
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '8px',
                              objectFit: 'cover',
                              background: '#1a1408',
                              border: '1px solid rgba(201,168,76,0.2)',
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#e8dfc0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>
                              {product.name}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#6b5e3a' }}>
                              ID: {product.id.slice(0, 8)}
                              {product.sizes?.length ? ` · Sizes: ${product.sizes.join(', ')}` : ''}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Collection */}
                      <td style={{ padding: '14px 20px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            background: 'rgba(201,168,76,0.12)',
                            color: goldLight,
                            textTransform: 'capitalize',
                          }}
                        >
                          {product.type}
                        </span>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '14px 20px', fontSize: '0.84rem', color: '#c4b58e' }}>
                        {product.category || 'General'}
                      </td>

                      {/* Price in Naira or Dollars */}
                      <td style={{ padding: '14px 20px' }}>
                        <span
                          style={{
                            fontSize: '0.92rem',
                            fontWeight: 700,
                            color: '#4ade80',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {formatPrice(product.price, product.currency)}
                        </span>
                        <span style={{ fontSize: '0.68rem', color: '#6b5e3a', marginLeft: '6px' }}>
                          ({product.currency})
                        </span>
                      </td>

                      {/* Description preview */}
                      <td style={{ padding: '14px 20px', fontSize: '0.82rem', color: '#8c7d58', maxWidth: '280px' }}>
                        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {product.description || '—'}
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEdit(product)}
                            title="Edit Product"
                            style={{
                              padding: '8px',
                              borderRadius: '6px',
                              background: 'rgba(201,168,76,0.1)',
                              border: '1px solid rgba(201,168,76,0.25)',
                              color: gold,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.25)')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)')}
                          >
                            <Edit2 size={15} />
                          </button>

                          <button
                            onClick={() => setProductToDelete(product)}
                            title="Delete Product"
                            style={{
                              padding: '8px',
                              borderRadius: '6px',
                              background: 'rgba(239,68,68,0.1)',
                              border: '1px solid rgba(239,68,68,0.25)',
                              color: '#f87171',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.25)')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)')}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div
              style={{
                padding: '14px 20px',
                background: '#0a0701',
                borderTop: '1px solid rgba(201,168,76,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                color: '#6b5e3a',
              }}
            >
              <span>Showing {filteredProducts.length} of {products.length} products</span>
              {!isConfigured && (
                <button
                  onClick={resetToDefaults}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#8c7d58',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '0.76rem',
                  }}
                >
                  Reset to default sample catalog
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ─── ADD / EDIT PRODUCT MODAL ─────────────────────────────────────── */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-modal-title"
              aria-describedby="admin-modal-description"
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: '#0e0900',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '18px',
                padding: '32px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.9), 0 0 32px rgba(201,168,76,0.1)',
              }}
            >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                borderBottom: '1px solid rgba(201,168,76,0.15)',
                paddingBottom: '16px',
              }}
            >
              <div>
                <h2
                  id="admin-modal-title"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    color: '#e8dfc0',
                    margin: 0,
                  }}
                >
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#8c7d58', margin: '4px 0 0' }}>
                  {editingProduct
                    ? 'Update product details, pricing, currency, and images'
                    : 'Fill in details to add a new luxury piece to your catalog'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8c7d58',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Error in Form */}
            {formError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#f87171',
                  fontSize: '0.84rem',
                  marginBottom: '20px',
                }}
              >
                <AlertTriangle size={16} />
                <span>{formError}</span>
              </div>
            )}

            {/* Product Form */}
            <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Product Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#c4b58e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Product Name *
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  required
                  placeholder="e.g. The Cherry Bloom Necklace"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#080808',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '8px',
                    color: '#e8dfc0',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Type and Category Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#c4b58e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Collection / Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ProductType })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#080808',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: '8px',
                      color: '#e8dfc0',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  >
                    {PRODUCT_TYPES.map((t) => (
                      <option key={t.value} value={t.value} style={{ background: '#0e0900' }}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#c4b58e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Category / Subcategory
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Necklaces, Boubou, Rolex"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#080808',
                      border: '1px solid rgba(201,168,76,0.3)',
                      borderRadius: '8px',
                      color: '#e8dfc0',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Price & Currency (Naira / Dollar) */}
              <div
                style={{
                  background: '#080808',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#c4b58e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Price & Currency *
                  </label>
                  {/* Currency Selector Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0e0900', padding: '4px', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, currency: 'NGN' })}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: formData.currency === 'NGN' ? `linear-gradient(135deg, ${gold}, ${goldLight})` : 'transparent',
                        color: formData.currency === 'NGN' ? '#080808' : '#8c7d58',
                        transition: 'all 0.2s',
                      }}
                    >
                      ₦ Naira (NGN)
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, currency: 'USD' })}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: formData.currency === 'USD' ? `linear-gradient(135deg, ${gold}, ${goldLight})` : 'transparent',
                        color: formData.currency === 'USD' ? '#080808' : '#8c7d58',
                        transition: 'all 0.2s',
                      }}
                    >
                      $ Dollars (USD)
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', alignItems: 'center' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#8c7d58', marginBottom: '4px' }}>
                      Price Amount ({formData.currency})
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: gold, fontWeight: 700 }}>
                        {formData.currency === 'USD' ? '$' : '₦'}
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        required
                        placeholder="0"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        style={{
                          width: '100%',
                          padding: '12px 14px 12px 32px',
                          background: '#0e0900',
                          border: '1px solid rgba(201,168,76,0.3)',
                          borderRadius: '8px',
                          color: '#e8dfc0',
                          fontSize: '1rem',
                          fontWeight: 600,
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Formatted Preview */}
                  <div
                    style={{
                      background: '#0e0900',
                      border: '1px solid rgba(74,222,128,0.2)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: '#8c7d58', marginBottom: '2px' }}>
                      Live Display Preview:
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#4ade80' }}>
                      {formatPrice(formData.price, formData.currency) || '₦0'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#c4b58e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Description & Story
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the materials, fit, elegance, craftsmanship, or styling notes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#080808',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '8px',
                    color: '#e8dfc0',
                    fontSize: '0.88rem',
                    outline: 'none',
                    resize: 'vertical',
                    lineHeight: 1.5,
                  }}
                />
              </div>

              {/* Available sizes */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#c4b58e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Available Sizes
                </label>
                <input
                  type="text"
                  placeholder="e.g. XS, S, M, L, XL"
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#080808',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '8px',
                    color: '#e8dfc0',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
                <p style={{ fontSize: '0.74rem', color: '#6b5e3a', margin: '6px 0 0' }}>
                  Separate sizes with commas. Leave blank for items without sizes.
                </p>
              </div>

              {/* Image Upload / URL */}
              <div
                style={{
                  background: '#080808',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '18px',
                }}
              >
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#c4b58e', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Product Image *
                </label>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {/* Preview Box */}
                  <div
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '10px',
                      border: '1px dashed rgba(201,168,76,0.3)',
                      background: '#0e0900',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <ImageIcon size={28} style={{ color: '#6b5e3a' }} />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: '220px' }}>
                    {/* File Upload Button */}
                    <div style={{ marginBottom: '10px' }}>
                      <label
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          background: 'rgba(201,168,76,0.15)',
                          border: '1px solid rgba(201,168,76,0.3)',
                          color: goldLight,
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: uploadingImage ? 'wait' : 'pointer',
                        }}
                      >
                        <Upload size={14} />
                        <span>{uploadingImage ? 'Uploading Image...' : 'Upload Image File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          disabled={uploadingImage}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <span style={{ fontSize: '0.74rem', color: '#6b5e3a', marginLeft: '10px' }}>
                        PNG, JPG, JPEG, WEBP
                      </span>
                    </div>

                    {/* Or URL Input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Or paste an image URL (/images/... or https://...)"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          background: '#0e0900',
                          border: '1px solid rgba(201,168,76,0.25)',
                          borderRadius: '8px',
                          color: '#e8dfc0',
                          fontSize: '0.82rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  marginTop: '10px',
                  borderTop: '1px solid rgba(201,168,76,0.15)',
                  paddingTop: '20px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: '#8c7d58',
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving || uploadingImage}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '8px',
                    background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
                    color: '#080808',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    border: 'none',
                    cursor: isSaving ? 'not-allowed' : 'pointer',
                    opacity: isSaving ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Check size={16} />
                  <span>{isSaving ? 'Saving...' : editingProduct ? 'Save Changes' : 'Publish Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRMATION MODAL ─────────────────────────────────────── */}
      {productToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              background: '#0e0900',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '16px',
              padding: '28px',
              textAlign: 'center',
              boxShadow: '0 20px 48px rgba(0,0,0,0.9)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.12)',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Trash2 size={24} />
            </div>

            <h3 style={{ fontSize: '1.25rem', color: '#e8dfc0', marginBottom: '8px' }}>
              Delete "{productToDelete.name}"?
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#8c7d58', marginBottom: '24px', lineHeight: 1.5 }}>
              This will remove this product from the store catalog. This action cannot be undone.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setProductToDelete(null)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: '#8c7d58',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  border: 'none',
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                }}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── SUPABASE SETUP / SQL INSTRUCTIONS MODAL ───────────────────────── */}
      {showSqlModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#0e0900',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '16px',
              padding: '28px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#e8dfc0', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={20} style={{ color: gold }} />
                Supabase Backend Setup Instructions
              </h3>
              <button onClick={() => setShowSqlModal(false)} style={{ background: 'transparent', border: 'none', color: '#8c7d58', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#c4b58e', lineHeight: 1.6, marginBottom: '16px' }}>
              <p>
                To enable multi-device live cloud sync with Supabase:
              </p>
              <ol style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Open your project on <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" style={{ color: gold }}>supabase.com</a></li>
                <li>Go to the <strong>SQL Editor</strong> tab on the left sidebar</li>
                <li>Run the updated schema script located in <code>supabase/schema.sql</code></li>
                <li>Go to <strong>Project Settings &gt; API</strong> and copy your Project URL and Anon Public Key</li>
                <li>Add them to your <code>.env</code> file:
                  <pre style={{ background: '#080808', padding: '8px', borderRadius: '6px', color: '#4ade80', marginTop: '4px' }}>
                    VITE_SUPABASE_URL=https://xyz.supabase.co{'\n'}
                    VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
                  </pre>
                </li>
                <li>Create an Admin user in Supabase under <strong>Authentication &gt; Users</strong>, then add their email to <code>public.admin_users</code> in the SQL Editor:
                  <pre style={{ background: '#080808', padding: '8px', borderRadius: '6px', color: '#4ade80', marginTop: '4px' }}>
                    insert into public.admin_users (email){'\n'}values ('admin@example.com'){'\n'}on conflict (email) do nothing;
                  </pre>
                </li>
              </ol>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setShowSqlModal(false)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '6px',
                  background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
                  color: '#080808',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
