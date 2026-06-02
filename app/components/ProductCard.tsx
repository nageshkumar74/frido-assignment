"use client";

import { useState } from "react";

export default function ProductCard({
  product,
}: {
  product: any;
}) {
  const [showModal, setShowModal] = useState(false);
  const [added, setAdded] = useState(false);

  const variants = product?.variants?.nodes || [];

  const [selectedVariant, setSelectedVariant] = useState(
    variants[0]
  );

  if (!selectedVariant) return null;

  const price = Number(selectedVariant.price.amount);

  const comparePrice = Math.round(price * 1.25);

  const discountPercentage = Math.round(
    ((comparePrice - price) / comparePrice) * 100
  );

  const handleSelectSize = (variant: any) => {
    setSelectedVariant(variant);
    setShowModal(false);
  };

  const handleAddToCart = () => {
    console.log({
      product: product.title,
      size: selectedVariant.title,
      price: selectedVariant.price.amount,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={
              product.featuredImage?.url ||
              "https://via.placeholder.com/500"
            }
            alt={product.title}
            className="
          w-full
  aspect-square
  object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />

          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {discountPercentage}% OFF
          </div>
        </div>

        {/* Content */}
        <div className="p-4">

          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
            {product.title}
          </h3>

          <p className="text-sm text-gray-700 mt-1">
            {product.vendor}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-2xl font-bold text-black">
              ₹{price}
            </span>

            <span className="text-gray-400 line-through">
              ₹{comparePrice}
            </span>

            <span className="text-green-600 text-sm font-semibold">
              {discountPercentage}% OFF
            </span>
          </div>

          {/* Selected Size */}
          <div className="mt-3 text-sm text-gray-600">
            Selected Size:
            <span className="font-semibold ml-1">
              {selectedVariant.title}
            </span>
          </div>

          {/* Select Size */}
          <button
            onClick={() => setShowModal(true)}
            className="
              w-full
              mt-4
              border
              border-gray-300
              rounded-full
              py-3
              font-medium
              hover:bg-gray-100
              transition
            "
          >
            Select Size
          </button>

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            className="
              w-full
              mt-3
              bg-black
              text-white
              rounded-full
              py-3
              font-medium
              hover:bg-gray-800
              transition
            "
          >
            {added ? "Added ✓" : "Add To Cart"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">

            <h3 className="text-lg font-semibold mb-4">
              Select Size
            </h3>

            <div className="space-y-2">
              {variants.map((variant: any) => (
                <button
                  key={variant.id}
                  onClick={() =>
                    handleSelectSize(variant)
                  }
                  className={`
                    w-full
                    border
                    rounded-xl
                    py-3
                    transition
                    ${selectedVariant.id === variant.id
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                    }
                  `}
                >
                  {variant.title}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="
                w-full
                mt-4
                bg-gray-200
                rounded-xl
                py-3
                hover:bg-gray-300
                transition
              "
            >
              Cancel
            </button>
          </div>

        </div>
      )}
    </>
  );
}