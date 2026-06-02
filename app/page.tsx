import { getProducts } from "@/app/lib/shopify";
import ProductGrid from "@/app/components/ProductGrid";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl  md:text-5xl font-bold text-center mb-10">
        Mother's Day Collection
      </h1>

      <ProductGrid products={products} />
    </main>
  );
}