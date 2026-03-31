'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import { getProductById } from '@/lib/api';
import { useCart } from '@/lib/cart-context';
import { Navbar } from '@/components/navbar';
import { CartDrawer } from '@/components/cart-drawer';
import { NutritionTable } from '@/components/nutrition-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const GRADE_COLORS: Record<string, string> = {
  A: 'bg-green-500',
  B: 'bg-lime-400',
  C: 'bg-yellow-400',
  D: 'bg-orange-400',
  E: 'bg-red-500',
};

const GRADE_TEXT_COLORS: Record<string, string> = {
  A: 'text-white',
  B: 'text-gray-900',
  C: 'text-gray-900',
  D: 'text-white',
  E: 'text-white',
};

const LABEL_COLORS: Record<string, string> = {
  Organic: 'bg-green-100 text-green-800',
  Vegan: 'bg-blue-100 text-blue-800',
  'Gluten-Free': 'bg-purple-100 text-purple-800',
  'No Added Sugar': 'bg-amber-100 text-amber-800',
  Natural: 'bg-teal-100 text-teal-800',
  'High Fiber': 'bg-emerald-100 text-emerald-800',
  'Whole Grain': 'bg-lime-100 text-lime-800',
  Probiotic: 'bg-cyan-100 text-cyan-800',
  'High Protein': 'bg-red-100 text-red-800',
  'Low Sugar': 'bg-orange-100 text-orange-800',
  'Fair Trade': 'bg-yellow-100 text-yellow-800',
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      const foundProduct = await getProductById(id);
      setProduct(foundProduct);
      setIsLoading(false);
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setCartOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar onCartClick={() => setCartOpen(true)} />
        <main className="flex-1 w-full py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-10 w-20 mb-8" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Skeleton className="h-96 w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar onCartClick={() => setCartOpen(true)} />
        <main className="flex-1 w-full py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
              <Button onClick={() => router.push('/')} className="mt-4">
                Back to Home
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1 w-full py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>

          {/* Product details grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-8">
            {/* Left side - Product image */}
            <div>
              <div className="relative h-96 w-full overflow-hidden rounded-lg bg-muted mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Nutrition grade */}
              <div
                className={`inline-flex h-20 w-20 items-center justify-center rounded-lg font-bold text-2xl ${
                  GRADE_COLORS[product.nutritionGrade]
                } ${GRADE_TEXT_COLORS[product.nutritionGrade]}`}
              >
                {product.nutritionGrade}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Nutrition Grade</p>
            </div>

            {/* Right side - Product info */}
            <div className="flex flex-col">
              {/* Name and category */}
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {product.brand} • {product.category}
              </p>

              {/* Labels */}
              {product.labels.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {product.labels.map((label) => (
                      <Badge
                        key={label}
                        className={LABEL_COLORS[label] || 'bg-gray-100 text-gray-800'}
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart button */}
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="mb-6"
              >
                Add to Cart
              </Button>

              {/* Product info */}
              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Product Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Barcode</p>
                    <p className="text-sm font-mono text-foreground">{product.barcode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Brand</p>
                    <p className="text-sm text-foreground">{product.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="text-sm text-foreground">{product.category}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Ingredients and Nutrition */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Ingredients */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Ingredients</h2>
              <p className="text-foreground leading-relaxed">
                {product.ingredients}
              </p>
            </Card>

            {/* Nutrition values table */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Nutritional Values</h2>
              <NutritionTable nutritionValues={product.nutritionValues} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
