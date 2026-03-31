import { NutritionValues } from '@/types';
import { Card } from '@/components/ui/card';

interface NutritionTableProps {
  nutritionValues: NutritionValues;
}

export function NutritionTable({ nutritionValues }: NutritionTableProps) {
  const items = [
    { label: 'Energy', value: nutritionValues.energy },
    { label: 'Fat', value: nutritionValues.fat },
    { label: 'Saturated Fat', value: nutritionValues.saturatedFat },
    { label: 'Carbohydrates', value: nutritionValues.carbohydrates },
    { label: 'Sugars', value: nutritionValues.sugars },
    { label: 'Fiber', value: nutritionValues.fiber },
    { label: 'Protein', value: nutritionValues.protein },
    { label: 'Salt', value: nutritionValues.salt },
  ];

  return (
    <Card className="overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted">
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Nutrient
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
              Per 100g
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.label}
              className={`border-b last:border-b-0 ${
                index % 2 === 0 ? 'bg-background' : 'bg-muted/50'
              }`}
            >
              <td className="px-4 py-3 text-sm font-medium text-foreground">
                {item.label}
              </td>
              <td className="px-4 py-3 text-right text-sm text-foreground">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
