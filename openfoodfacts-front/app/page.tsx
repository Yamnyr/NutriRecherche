"use client";

import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import { searchProducts } from "@/lib/api";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    minEnergy: "",
    maxEnergy: "",
    maxSugar: "",
    maxFat: "",
  });
  const [products, setProducts] = useState([]);

  function updateFilter(key: string, value: any) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  async function fetchData() {
    // Allow searches when either:
    // - query is present and has at least 2 chars
    // - OR at least one filter is set (filter-only searches)
    const hasFilters = Object.values(filters).some(
      (v) => v !== undefined && v !== null && String(v).trim() !== ""
    );

    if ((!!!query || query.length < 2) && !hasFilters) return;

    // Always send a `q` parameter (empty string if none) to avoid backend 400
    const data = await searchProducts({
      q: query ?? "",
      ...filters,
    });

    setProducts(data?.products || []);
  }

  useEffect(() => {
    fetchData();
  }, [query, filters]);

  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      
      {/* Filtres */}
      <div className="col-span-1">
        <Filters filters={filters} onChange={updateFilter} />
      </div>

      {/* Résultats */}
      <div className="col-span-3 space-y-4">
        
        <SearchBar value={query} onChange={setQuery} />  {/* ← IMPORTANT */}

        <div className="grid grid-cols-3 gap-4 mt-6">
          {products.map((p: any) => (
            <ProductCard key={p.code} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
