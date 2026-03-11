
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "../store/thunks/cartThunks";
import { fetchProductById } from "../store/thunks/productThunks";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(
    (state) => state.product.selectedProduct
  );

  const fetchState = useSelector(
    (state) => state.product.detailFetchState
  );

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (fetchState === "FETCHING" || !product) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <section className="flex flex-col gap-6 px-4 py-6 md:flex-row md:gap-10">
      <div className="w-full md:w-1/2">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 md:w-1/2">
        <h1 className="text-xl font-bold">
          {product.name}
        </h1>

        <p className="text-lg font-semibold">
          ${product.price}
        </p>

        <p className="text-gray-600 text-sm">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}