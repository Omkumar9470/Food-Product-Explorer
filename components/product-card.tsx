'use client';

import { Product } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner' 

interface ProductCardProps {
  product: Product;
}

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

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
  e.preventDefault();
  addItem(product);
  toast.success(`${product.name} added to cart!`, {
    description: 'View your cart to see all items.',
    duration: 3000,
  });
};
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        {/* Image container */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Nutrition grade badge */}
          <div
            className={`absolute top-3 right-3 flex h-12 w-12 items-center justify-center rounded-lg font-bold text-lg ${
              GRADE_COLORS[product.nutritionGrade]
            } ${GRADE_TEXT_COLORS[product.nutritionGrade]} shadow-md`}
          >
            {product.nutritionGrade}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Category */}
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
            {product.category}
          </p>

          {/* Product name */}
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Ingredients */}
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
            {product.shortIngredients}
          </p>

          {/* Add to cart button */}
          <Button
            onClick={handleAddToCart}
            className="mt-4 w-full"
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </Link>
  );
}
