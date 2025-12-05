import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/product/${product.code}`}>
      <Card className="p-4 hover:bg-gray-100 transition cursor-pointer">
        <CardContent>
          <h2 className="font-bold text-lg">
            {product.product_name || "Sans nom"}
          </h2>
          <p className="text-sm text-gray-500">{product.brands}</p>

          {product.nutriments && (
            <p className="text-xs mt-2">
              Énergie: {product.nutriments.energy ?? "?"} kcal
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
