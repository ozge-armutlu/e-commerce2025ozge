import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import Features from "../components/Features";

const mockProducts = [
  { id: 1, name: "Summer Dress", price: "$49.99", image: "https://via.placeholder.com/300x300" },
  { id: 2, name: "Casual Shirt", price: "$29.99", image: "https://via.placeholder.com/300x300" },
  { id: 3, name: "Jeans", price: "$59.99", image: "https://via.placeholder.com/300x300" },
  { id: 4, name: "Sneakers", price: "$79.99", image: "https://via.placeholder.com/300x300" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">

      <HeroSlider />

      <Features />

      <section className="px-4">

        <h2 className="text-xl font-bold mb-2">
          New Arrivals
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          Best picks for you
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </section>
    </div>
  );
}








