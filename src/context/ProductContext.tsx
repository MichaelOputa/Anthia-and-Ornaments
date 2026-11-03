import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product, ProductFormData, ProductType } from '../types/product';
import { initialProducts } from '../data/initialProducts';
import { supabase, supabaseProjectUrl, isSupabaseConfigured } from '../lib/supabase';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  isCloud: boolean;
  addProduct: (data: ProductFormData) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<ProductFormData>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  syncSeedProductsToCloud: () => Promise<{ success: boolean; count: number; error?: string }>;
  resetToDefaults: () => void;
  getProductsByType: (type: ProductType) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'anthia_products_catalog_v1';

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error: sbError } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

          if (sbError) {
            console.warn('Supabase fetch failed, falling back to local data:', sbError.message);
            loadFromLocalStorage();
          } else if (data && data.length > 0) {
            setProducts(data as Product[]);
          } else {
            setProducts([]);
          }
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          console.warn('Supabase error:', message);
          loadFromLocalStorage();
        }
      } else {
        loadFromLocalStorage();
      }

      setLoading(false);
    }

    function loadFromLocalStorage() {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
            return;
          }
        }
      } catch (e) {
        console.error('Failed to parse localStorage products:', e);
      }
      // Default to initial items if nothing is saved
      setProducts(initialProducts);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialProducts));
    }

    loadData();
  }, []);

  // Save to local storage whenever products change (as backup)
  const persistLocally = (updated: Product[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    if (isSupabaseConfigured && supabase) {
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${crypto.randomUUID()}-${cleanName}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    }

    // Fallback: convert file to data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  };

  const removeProductImage = async (image: string): Promise<void> => {
    if (!isSupabaseConfigured || !supabase) return;

    const marker = '/storage/v1/object/public/product-images/';
    let path: string;
    try {
      const imageUrl = new URL(image);
      if (imageUrl.origin !== new URL(supabaseProjectUrl).origin) return;
      const markerIndex = imageUrl.pathname.indexOf(marker);
      if (markerIndex === -1) return;
      path = decodeURIComponent(imageUrl.pathname.slice(markerIndex + marker.length));
    } catch {
      return;
    }

    if (!path) return;
    const { error: removeError } = await supabase.storage
      .from('product-images')
      .remove([path]);
    if (removeError) throw removeError;
  };

  const addProduct = async (data: ProductFormData): Promise<Product> => {
    const newProduct: Product = {
      id: isSupabaseConfigured ? (crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`) : `local-${Date.now()}`,
      name: data.name,
      type: data.type,
      category: data.category || 'General',
      description: data.description || '',
      sizes: data.sizes || [],
      price: Number(data.price) || 0,
      currency: data.currency || 'NGN',
      image: data.image || '/images/placeholder.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: inserted, error: insertError } = await supabase
          .from('products')
          .insert([newProduct])
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        const finalItem = (inserted as Product) || newProduct;
        setProducts((prev) => {
          const next = [finalItem, ...prev];
          persistLocally(next);
          return next;
        });
        return finalItem;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to add product to cloud';
        setError(message);
        throw new Error(message);
      }
    } else {
      setProducts((prev) => {
        const next = [newProduct, ...prev];
        persistLocally(next);
        return next;
      });
      return newProduct;
    }
  };

  const updateProduct = async (id: string, updates: Partial<ProductFormData>): Promise<Product> => {
    const previousProduct = products.find((product) => product.id === id);
    const updatedFields: Partial<Product> = {
      ...updates,
      updated_at: new Date().toISOString(),
    };
    if (updates.price !== undefined) updatedFields.price = Number(updates.price);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: updated, error: updateError } = await supabase
          .from('products')
          .update(updatedFields)
          .eq('id', id)
          .select()
          .single();

        if (updateError) {
          throw updateError;
        }

        const finalItem = updated as Product;
        setProducts((prev) => {
          const next = prev.map((p) => (p.id === id ? finalItem : p));
          persistLocally(next);
          return next;
        });
        if (
          previousProduct &&
          updates.image &&
          updates.image !== previousProduct.image &&
          !products.some((product) => product.id !== id && product.image === previousProduct.image)
        ) {
          try {
            await removeProductImage(previousProduct.image);
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown storage error';
            throw new Error(`Product updated, but its previous image could not be removed: ${message}`);
          }
        }
        return finalItem;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to update product in cloud';
        setError(message);
        throw new Error(message);
      }
    } else {
      if (!previousProduct) throw new Error(`Product with ID ${id} not found`);
      const finalItem = { ...previousProduct, ...updatedFields };
      const next = products.map((product) => product.id === id ? finalItem : product);
      setProducts(next);
      persistLocally(next);
      return finalItem;
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    const productToDelete = products.find((product) => product.id === id);
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: deleteError } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (deleteError) {
          throw deleteError;
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to delete product from cloud';
        setError(message);
        throw new Error(message);
      }
    }

    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      persistLocally(next);
      return next;
    });
    if (
      productToDelete?.image &&
      !products.some((product) => product.id !== id && product.image === productToDelete.image)
    ) {
      try {
        await removeProductImage(productToDelete.image);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown storage error';
        throw new Error(`Product deleted, but its image could not be removed: ${message}`);
      }
    }
  };

  const syncSeedProductsToCloud = async (): Promise<{ success: boolean; count: number; error?: string }> => {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, count: 0, error: 'Supabase is not configured' };
    }

    try {
      const payload = initialProducts.map((p) => ({
        name: p.name,
        type: p.type,
        category: p.category,
        description: p.description,
        sizes: p.sizes || [],
        price: p.price,
        currency: p.currency,
        image: p.image,
        seed_key: p.id,
      }));

      const { data: existingSeeds, error: existingError } = await supabase
        .from('products')
        .select('seed_key, name, type, category, image');

      if (existingError) {
        return { success: false, count: 0, error: existingError.message };
      }

      const existingKeys = new Set((existingSeeds || []).map((product) => product.seed_key));
      const existingSeedDetails = new Set(
        (existingSeeds || []).map((product) => JSON.stringify([
          product.name,
          product.type,
          product.category,
          product.image,
        ]))
      );
      const missingSeeds = payload.filter((product) => (
        !existingKeys.has(product.seed_key) &&
        !existingSeedDetails.has(JSON.stringify([
          product.name,
          product.type,
          product.category,
          product.image,
        ]))
      ));

      if (missingSeeds.length > 0) {
        const { error: insertError } = await supabase
          .from('products')
          .insert(missingSeeds);

        if (insertError) {
          return { success: false, count: 0, error: insertError.message };
        }
      }

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (fetchError) {
        return { success: false, count: 0, error: fetchError.message };
      }

      setProducts(data as Product[]);
      persistLocally(data as Product[]);
      return { success: true, count: missingSeeds.length };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to sync products';
      return { success: false, count: 0, error: message };
    }
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    persistLocally(initialProducts);
  };

  const getProductsByType = (type: ProductType): Product[] => {
    return products.filter((p) => p.type === type);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        isCloud: isSupabaseConfigured,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        syncSeedProductsToCloud,
        resetToDefaults,
        getProductsByType,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
