'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/navbar';
import { CartDrawer } from '@/components/cart-drawer';
import { SearchBar } from '@/components/search-bar';
import { FilterBar } from '@/components/filter-bar';
import { ProductGrid } from '@/components/product-grid';
import { Button } from '@/components/ui/button';
import { getCategories, getProducts } from '@/lib/api';

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filters and search
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  // Load products whenever filters change
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setCurrentPage(1);

      const { products: newProducts, total } = await getProducts(
        1,
        12,
        selectedCategory === 'all' ? undefined : selectedCategory,
        selectedSort || undefined,
        searchQuery,
        barcodeQuery
      );

      setProducts(newProducts);
      setHasMore(newProducts.length < total);
      setIsLoading(false);
    };

    // Debounce search
    const timer = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSort, searchQuery, barcodeQuery]);

  const handleLoadMore = useCallback(async () => {
  const nextPage = currentPage + 1;
  setIsLoading(true);

  const { products: newProducts, total } = await getProducts(
    nextPage,
    12,
    selectedCategory === 'all' ? undefined : selectedCategory,
    selectedSort || undefined,
    searchQuery,
    barcodeQuery
  );

  setProducts((prev) => {
    const updated = [...prev, ...newProducts];
    setHasMore(updated.length < total);
    return updated;
  });

  setCurrentPage(nextPage);
  setIsLoading(false);
}, [currentPage, selectedCategory, selectedSort, searchQuery, barcodeQuery]);

  const handleResetFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedSort('');
    setSearchQuery('');
    setBarcodeQuery('');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      {/* Hero section */}
      <section className="w-full border-b border-border bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Explore Food Products
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover nutritious food options with detailed nutrition grades and ingredient information
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 w-full py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search section */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">Search Products</h2>
            <SearchBar
              onSearchChange={setSearchQuery}
              onBarcodeChange={setBarcodeQuery}
            />
          </div>

          {/* Filter section */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">Filter & Sort</h2>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              selectedSort={selectedSort}
              onCategoryChange={setSelectedCategory}
              onSortChange={setSelectedSort}
              onReset={handleResetFilters}
            />
          </div>

          {/* Product grid */}
          <div className="mb-8">
            <ProductGrid products={products} isLoading={isLoading} />
          </div>

          {/* Load more button */}
          {hasMore && products.length > 0 && (
            <div className="flex justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={handleLoadMore}
              >
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
