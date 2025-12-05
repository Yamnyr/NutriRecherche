"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Zap, Award } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const nutriscoreColors: Record<string, string> = {
    a: "bg-green-500",
    b: "bg-lime-500",
    c: "bg-yellow-500",
    d: "bg-orange-500",
    e: "bg-red-500",
  }

  const ecoscoreColors: Record<string, string> = {
    a: "bg-green-500",
    b: "bg-lime-500",
    c: "bg-yellow-500",
    d: "bg-orange-500",
    e: "bg-red-500",
  }

  return (
    <Link href={`/product/${product.code}`}>
      <Card className="group overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full">
        {/* Product Image */}
        <div className="aspect-square bg-muted/50 relative overflow-hidden">
          {product.image_small_url || product.image_url ? (
            <img
              src={product.image_small_url || product.image_url || ""}
              alt={product.product_name || "Produit"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Award className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}

          {/* Scores overlay */}
          <div className="absolute top-3 right-3 flex gap-2">
            {product.nutriscore_grade && (
              <div
                className={`w-8 h-8 rounded-lg ${
                  nutriscoreColors[product.nutriscore_grade.toLowerCase()] || "bg-muted"
                } flex items-center justify-center shadow-lg`}
              >
                <span className="text-xs font-bold text-white uppercase">{product.nutriscore_grade}</span>
              </div>
            )}
            {product.ecoscore_grade && (
              <div
                className={`w-8 h-8 rounded-lg ${
                  ecoscoreColors[product.ecoscore_grade.toLowerCase()] || "bg-muted"
                } flex items-center justify-center shadow-lg`}
              >
                <Leaf className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.product_name || "Produit sans nom"}
          </h3>

          {product.brands && <p className="text-xs text-muted-foreground mb-3">{product.brands}</p>}

          {product.quantity && (
            <Badge variant="secondary" className="mb-3 text-xs">
              {product.quantity}
            </Badge>
          )}

          {/* Nutrition highlights */}
          {product.nutriments && (
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
              {product.nutriments.energy !== null && product.nutriments.energy !== undefined && (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-xs font-mono font-semibold">{product.nutriments.energy}</p>
                  <p className="text-[10px] text-muted-foreground">kcal</p>
                </div>
              )}
              {product.nutriments.sugars !== null && product.nutriments.sugars !== undefined && (
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Sucres</p>
                  <p className="text-xs font-mono font-semibold">{product.nutriments.sugars}g</p>
                </div>
              )}
              {product.nutriments.fat !== null && product.nutriments.fat !== undefined && (
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground mb-1">Graisse</p>
                  <p className="text-xs font-mono font-semibold">{product.nutriments.fat}g</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
