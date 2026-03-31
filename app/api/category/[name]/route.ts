import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  try {
    const url = `https://world.openfoodfacts.org/category/${name}.json?page=${page}&fields=code,product_name,brands,categories_tags,labels_tags,ingredients_text,nutrition_grades,nutriscore_grade,nutriments,image_front_url,image_url`;

    const response = await fetch(url, {
      headers: { 'User-Agent': 'FoodExplorer/1.0' },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return NextResponse.json({ products: [], count: 0 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Category API error:', error);
    return NextResponse.json({ products: [], count: 0 });
  }
}