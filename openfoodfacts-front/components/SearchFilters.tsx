"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SlidersHorizontal, Zap, Candy, Droplet } from "lucide-react"
import type { SearchFilters as FilterType } from "@/lib/types"

interface SearchFiltersProps {
  filters: FilterType
  onChange: (key: keyof FilterType, value: string) => void
}

export default function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Filtres Avancés</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="brand" className="text-sm font-medium">
            Marque
          </Label>
          <Input
            id="brand"
            value={filters.brand}
            onChange={(e) => onChange("brand", e.target.value)}
            placeholder="ex: Carrefour"
            className="bg-background border-border/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sortBy" className="text-sm font-medium">
            Trier par
          </Label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => onChange("sortBy", e.target.value)}
            className="w-full bg-background border border-border/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Aucun</option>
            <option value="energy">Énergie</option>
            <option value="sugars">Sucres</option>
            <option value="fat">Matières grasses</option>
          </select>
        </div>

        {filters.sortBy && (
          <div className="space-y-2">
            <Label htmlFor="order" className="text-sm font-medium">
              Ordre
            </Label>
            <select
              id="order"
              value={filters.order}
              onChange={(e) => onChange("order", e.target.value)}
              className="w-full bg-background border border-border/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="asc">Croissant</option>
              <option value="desc">Décroissant</option>
            </select>
          </div>
        )}

        <div className="pt-4 border-t border-border/50">
          <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Énergie (kcal/100g)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="minEnergy" className="text-xs text-muted-foreground">
                Min
              </Label>
              <Input
                id="minEnergy"
                type="number"
                value={filters.minEnergy}
                onChange={(e) => onChange("minEnergy", e.target.value)}
                placeholder="0"
                className="bg-background border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxEnergy" className="text-xs text-muted-foreground">
                Max
              </Label>
              <Input
                id="maxEnergy"
                type="number"
                value={filters.maxEnergy}
                onChange={(e) => onChange("maxEnergy", e.target.value)}
                placeholder="1000"
                className="bg-background border-border/50"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Candy className="w-4 h-4 text-primary" />
            Sucres (g/100g)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="minSugar" className="text-xs text-muted-foreground">
                Min
              </Label>
              <Input
                id="minSugar"
                type="number"
                value={filters.minSugar}
                onChange={(e) => onChange("minSugar", e.target.value)}
                placeholder="0"
                className="bg-background border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSugar" className="text-xs text-muted-foreground">
                Max
              </Label>
              <Input
                id="maxSugar"
                type="number"
                value={filters.maxSugar}
                onChange={(e) => onChange("maxSugar", e.target.value)}
                placeholder="100"
                className="bg-background border-border/50"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Droplet className="w-4 h-4 text-primary" />
            Matières grasses (g/100g)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="minFat" className="text-xs text-muted-foreground">
                Min
              </Label>
              <Input
                id="minFat"
                type="number"
                value={filters.minFat}
                onChange={(e) => onChange("minFat", e.target.value)}
                placeholder="0"
                className="bg-background border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxFat" className="text-xs text-muted-foreground">
                Max
              </Label>
              <Input
                id="maxFat"
                type="number"
                value={filters.maxFat}
                onChange={(e) => onChange("maxFat", e.target.value)}
                placeholder="100"
                className="bg-background border-border/50"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
