import HeroSlider from "../components/HeroSlider";

import Features from "../components/Features";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";


export default function HomePage() {

  const categories = useSelector((state) => state.category.categories);

  const slugify = (text) =>
    text
      ?.toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/\s+/g, "-");

  const topCategories = categories ? [...categories].sort((a,b) => b.rating - a.rating).slice(0, 5) : [];

  


  return (
    <div className="flex flex-col gap-8">

      <HeroSlider />

      <Features />

    <section className="px-4">
      <h2 className="text-xl font-bold mb-4">Top Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    {topCategories.map((cat) => (
    <Link
    key={cat.id}
    to={`/shop/${cat.gender}/${slugify(cat.title)}/${cat.id}`}
    className="border rounded p-3 text-center hover:shadow-md transition">

      {cat.img && (

        <img
          src={cat.img}
          alt={cat.title}
          className="w-full h-32 object-cover mb-2"/>
      )}
    <p className="font-medium">{cat.title}</p>

    </Link>

    ))}
 </div>
 </section>

      
    </div>
  );
}








