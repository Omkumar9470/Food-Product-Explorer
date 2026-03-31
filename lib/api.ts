import { Product, NutritionValues } from '@/types';

// Mock categories
const CATEGORIES = ['Beverages', 'Dairy', 'Snacks', 'Cereals', 'Fruits'];

// Mock nutrition values
const mockNutrition: NutritionValues = {
  energy: '250 kcal',
  fat: '5g',
  saturatedFat: '2g',
  carbohydrates: '45g',
  sugars: '12g',
  fiber: '3g',
  protein: '8g',
  salt: '0.5g',
};

// Mock products
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Whole Milk',
    category: 'Dairy',
    brand: 'Pure Valley',
    image: '/placeholder-product.jpg',
    barcode: '8711200748390',
    nutritionGrade: 'A',
    ingredients: 'Whole milk, vitamin D, calcium',
    shortIngredients: 'Whole milk, vitamin D, calcium',
    nutritionValues: mockNutrition,
    labels: ['Organic', 'Natural'],
  },
  {
    id: '2',
    name: 'Almond Butter Granola',
    category: 'Snacks',
    brand: 'Nature\'s Best',
    image: '/placeholder-product.jpg',
    barcode: '8711200748391',
    nutritionGrade: 'B',
    ingredients: 'Oats, almonds, honey, coconut oil, sea salt',
    shortIngredients: 'Oats, almonds, honey, coconut oil...',
    nutritionValues: { ...mockNutrition, protein: '12g' },
    labels: ['Vegan', 'Gluten-Free'],
  },
  {
    id: '3',
    name: 'Fresh Orange Juice',
    category: 'Beverages',
    brand: 'Sunny Citrus',
    image: '/placeholder-product.jpg',
    barcode: '8711200748392',
    nutritionGrade: 'A',
    ingredients: '100% pure orange juice, vitamin C',
    shortIngredients: '100% pure orange juice, vitamin C',
    nutritionValues: { ...mockNutrition, energy: '110 kcal', sugars: '9g' },
    labels: ['Natural', 'No Added Sugar'],
  },
  {
    id: '4',
    name: 'Whole Wheat Cereal',
    category: 'Cereals',
    brand: 'Grain Power',
    image: '/placeholder-product.jpg',
    barcode: '8711200748393',
    nutritionGrade: 'B',
    ingredients: 'Whole wheat, malted barley, honey, salt',
    shortIngredients: 'Whole wheat, malted barley, honey, salt',
    nutritionValues: { ...mockNutrition, fiber: '6g' },
    labels: ['High Fiber', 'Whole Grain'],
  },
  {
    id: '5',
    name: 'Protein Energy Bar',
    category: 'Snacks',
    brand: 'FitNutrition',
    image: '/placeholder-product.jpg',
    barcode: '8711200748394',
    nutritionGrade: 'B',
    ingredients: 'Whey protein, oats, almonds, dark chocolate, stevia',
    shortIngredients: 'Whey protein, oats, almonds, dark chocolate...',
    nutritionValues: { ...mockNutrition, protein: '20g', sugars: '3g' },
    labels: ['High Protein', 'Low Sugar'],
  },
  {
    id: '6',
    name: 'Greek Yogurt Plain',
    category: 'Dairy',
    brand: 'Hellas Dairy',
    image: '/placeholder-product.jpg',
    barcode: '8711200748395',
    nutritionGrade: 'A',
    ingredients: 'Milk, live cultures',
    shortIngredients: 'Milk, live cultures',
    nutritionValues: { ...mockNutrition, protein: '10g', sugars: '5g' },
    labels: ['Probiotic', 'No Added Sugar'],
  },
  {
    id: '7',
    name: 'Organic Chia Seed Mix',
    category: 'Snacks',
    brand: 'SuperSeeds',
    image: '/placeholder-product.jpg',
    barcode: '8711200748396',
    nutritionGrade: 'A',
    ingredients: 'Chia seeds, pumpkin seeds, sunflower seeds, salt',
    shortIngredients: 'Chia seeds, pumpkin seeds, sunflower seeds...',
    nutritionValues: { ...mockNutrition, fiber: '10g', protein: '9g' },
    labels: ['Organic', 'Vegan', 'Gluten-Free'],
  },
  {
    id: '8',
    name: 'Fresh Apple',
    category: 'Fruits',
    brand: 'Nature\'s Harvest',
    image: '/placeholder-product.jpg',
    barcode: '8711200748397',
    nutritionGrade: 'A',
    ingredients: '100% apple',
    shortIngredients: '100% apple',
    nutritionValues: { ...mockNutrition, energy: '52 kcal', fiber: '2.4g', sugars: '10g' },
    labels: ['Natural', 'Organic'],
  },
  {
    id: '9',
    name: 'Dark Chocolate 70%',
    category: 'Snacks',
    brand: 'Cocoa Excellence',
    image: '/placeholder-product.jpg',
    barcode: '8711200748398',
    nutritionGrade: 'C',
    ingredients: 'Cocoa solids, cocoa butter, sugar, vanilla',
    shortIngredients: 'Cocoa solids, cocoa butter, sugar, vanilla',
    nutritionValues: { ...mockNutrition, energy: '598 kcal', fat: '35g' },
    labels: ['Fair Trade', 'Vegan'],
  },
];

export async function getCategories(): Promise<string[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(CATEGORIES), 300);
  });
}

export async function getProducts(
  page: number = 1,
  limit: number = 12,
  category?: string,
  sortBy?: string,
  searchQuery?: string,
  barcodeQuery?: string
): Promise<{ products: Product[]; total: number }> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...MOCK_PRODUCTS];

      // Filter by category
      if (category && category !== 'all') {
        filtered = filtered.filter((p) => p.category === category);
      }

      // Filter by name search
      if (searchQuery) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by barcode
      if (barcodeQuery) {
        filtered = filtered.filter((p) =>
          p.barcode.includes(barcodeQuery)
        );
      }

      // Sort
      if (sortBy === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'name-desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortBy === 'grade-best') {
        const gradeOrder = { A: 0, B: 1, C: 2, D: 3, E: 4 };
        filtered.sort((a, b) => gradeOrder[a.nutritionGrade] - gradeOrder[b.nutritionGrade]);
      } else if (sortBy === 'grade-worst') {
        const gradeOrder = { A: 0, B: 1, C: 2, D: 3, E: 4 };
        filtered.sort((a, b) => gradeOrder[b.nutritionGrade] - gradeOrder[a.nutritionGrade]);
      }

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);

      resolve({
        products: paginated,
        total: filtered.length,
      });
    }, 300);
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find((p) => p.id === id);
      resolve(product || null);
    }, 200);
  });
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.barcode.includes(query)
      );
      resolve(results);
    }, 200);
  });
}
