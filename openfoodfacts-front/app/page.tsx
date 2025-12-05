"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SearchFilters from "@/components/SearchFilters"
import ProductCard from "@/components/ProductCard"
import { searchProducts } from "@/lib/api"
import type { Product, SearchFilters as FilterType } from "@/lib/types"

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<FilterType>({
    brand: "",
    sortBy: "",
    order: "asc",
    minEnergy: "",
    maxEnergy: "",
    minSugar: "",
    maxSugar: "",
    minFat: "",
    maxFat: "",
  })
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [searchInput, setSearchInput] = useState("")

  function updateFilter(key: keyof FilterType, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  async function fetchData() {
    if (!query.trim() && !Object.values(filters).some((v) => v)) return

    setLoading(true)
    try {
      const data = await searchProducts({
        q: query || "",
        ...filters,
      })
      setProducts(data?.products || [])
      setCount(data?.count || 0)
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
      setProducts([])
      setCount(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, 300)

    return () => clearTimeout(timer)
  }, [query, filters])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setQuery(searchInput)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">NutriRecherche</h1>
                <p className="text-xs text-muted-foreground">Des choix alimentaires plus intelligents</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Découvrez des Choix <span className="text-primary">Alimentaires Plus Sains</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Recherchez parmi des milliers de produits avec des filtres avancés et trouvez de meilleures alternatives
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Recherchez des produits, marques ou catégories..."
              className="pl-12 pr-24 h-14 text-lg bg-card border-border/50"
            />
            <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-10">
              Rechercher
            </Button>
          </form>
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="w-80 flex-shrink-0 sticky top-24">
            <SearchFilters filters={filters} onChange={updateFilter} />
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <p className="text-muted-foreground">Recherche de produits...</p>
                </div>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">{count}</span> produit{count > 1 ? "s" : ""} trouvé
                    {count > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.code} product={product} />
                  ))}
                </div>
              </>
            ) : query || Object.values(filters).some((v) => v) ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-muted-foreground">Essayez d'ajuster votre recherche ou vos filtres</p>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Commencez votre recherche</h3>
                <p className="text-muted-foreground">Entrez un nom de produit ou utilisez les filtres pour commencer</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
