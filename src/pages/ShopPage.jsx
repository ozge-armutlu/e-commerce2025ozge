import ProductCard from "../components/ProductCard";

const mockProducts = [
  { id: 1, name: "Summer Dress", price: "$49.99", image: "https://via.placeholder.com/300x300" },
  { id: 2, name: "Casual Shirt", price: "$29.99", image: "https://via.placeholder.com/300x300" },
  { id: 3, name: "Jeans", price: "$59.99", image: "https://via.placeholder.com/300x300" },
  { id: 4, name: "Sneakers", price: "$79.99", image: "https://via.placeholder.com/300x300" },
];

export default function ShopPage() {
  return (
    <section className="flex flex-col gap-6 px-4 py-6">

      {/* Page Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">Shop</h1>
        <p className="text-gray-500 text-sm">
          All products
        </p>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
}

