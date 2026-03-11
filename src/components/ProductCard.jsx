

import { Link } from "react-router-dom";

import {useDispatch} from "react-redux";

import { addToCart } from "../store/actions/shoppingCartActions";

export default function ProductCard({ product }) {
 const dispatch = useDispatch();

 const handleAddToCart = (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("Eklenen ürün:", product.name);
 console.log("Butona basıldı, ürün:", product);
  dispatch(addToCart(product));
 };

const slug = product.name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

const productUrl = `/shop/${product.category?.gender}/${product.category?.title}/${product.category?.id}/${slug}/${product.id}`;

  return (
    <Link
      to={productUrl}
      className="border rounded-2xl shadow-md p-4 flex flex-col gap-3 
                 cursor-pointer hover:shadow-xl hover:-translate-y-1 
                 transition duration-300"
    >
      <img
        src={product.images?.[0]?.url}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="flex flex-col gap-1">
        <h3 className="mt-3 font-semibold text-sm">
          {product.name}
        </h3>

        <span className="text-lg font-bold text-green-600">
          ${product.price}
        </span>
      </div>

      <div className="flex gap-2 mt-auto">

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700"
        >
          Add to Cart
        </button>

      </div>
    </Link>
  );
}
