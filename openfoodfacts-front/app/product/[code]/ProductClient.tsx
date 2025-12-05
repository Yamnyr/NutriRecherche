"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

export default function ProductClient({ code }: { code: string }) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_URL}/api/product/${code}`);
      const data = await res.json();
      setProduct(data);
    }
    load();
  }, [code]);

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {product.product_name ?? "Nom inconnu"}
      </h1>

      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.product_name}
          className="rounded-xl shadow mb-6 w-64"
        />
      )}

      <div className="space-y-2 text-lg">
        <p><strong>Marque :</strong> {product.brands ?? "Non renseigné"}</p>
        <p><strong>Catégories :</strong> {product.categories ?? "Non renseigné"}</p>
        <p><strong>Quantité :</strong> {product.quantity ?? "Non renseigné"}</p>
        <p><strong>Nutriscore :</strong> {product.nutriscore_grade?.toUpperCase() ?? "?"}</p>
        <p><strong>Ecoscore :</strong> {product.ecoscore_grade?.toUpperCase() ?? "?"}</p>

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Nutriments</h2>
          <ul className="list-disc ml-6">
            <li>Énergie : {product.nutriments?.energy ?? "?"}</li>
            <li>Sucres : {product.nutriments?.sugars ?? "?"}</li>
            <li>Sel : {product.nutriments?.salt ?? "?"}</li>
            <li>Graisses : {product.nutriments?.fat ?? "?"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
