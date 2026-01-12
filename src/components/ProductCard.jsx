

import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>

      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col active:scale-95 transition">

        {/* IMAGE */}
        <div className="w-full aspect-square overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <h3 className="mt-3 font-semibold text-sm">
          {product.name}
        </h3>

        <p className="text-lg font-bold text-green-600">
          {product.price}
        </p>

        {/* BUTTON */}
        <button
          className="mt-2 w-full bg-green-500 text-white py-2 rounded-full"
          onClick={(e) => e.preventDefault()}
        >
          Add to Cart
        </button>

      </div>

    </Link>
  );
}

