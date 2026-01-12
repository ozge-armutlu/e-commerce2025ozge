
import { useParams } from "react-router-dom";


const mockProducts = [
  {
    id: 1,
    name: "Summer Dress",
    price: "$49.99",
    description: "Light and comfortable summer dress for daily use.",
    image: "https://via.placeholder.com/600x600",
  },
  {
    id: 2,
    name: "Casual Shirt",
    price: "$29.99",
    description: "Casual shirt suitable for everyday wear.",
    image: "https://via.placeholder.com/600x600",
  },
  {
    id: 3,
    name: "Jeans",
    price: "$59.99",
    description: "Classic jeans with modern fit.",
    image: "https://via.placeholder.com/600x600",
  },
  {
    id: 4,
    name: "Sneakers",
    price: "$79.99",
    description: "Comfortable sneakers for all-day walking.",
    image: "https://via.placeholder.com/600x600",
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();

  const product = mockProducts.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 px-4 py-6 md:flex-row md:gap-10">

      {/* Product Image */}
      <div className="w-full md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-4 md:w-1/2">
        <h1 className="text-xl font-bold">
          {product.name}
        </h1>

        <p className="text-lg font-semibold">
          {product.price}
        </p>

        <p className="text-gray-600 text-sm">
          {product.description}
        </p>

        <button className="mt-4 w-full rounded-lg bg-black py-3 text-white md:w-fit md:px-8">
          Add to Cart
        </button>
      </div>

    </section>
  );
}
