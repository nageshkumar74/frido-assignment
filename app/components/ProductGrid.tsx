import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
}: {
  products: any[];
}) {
  return (
    <div
      className="
      grid
      grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-6
    "
    >
      {products.slice(0, 6).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}