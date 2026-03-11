
import { Menu, ShoppingCart, Search, User, LogOut, ChevronDown, Package } from "lucide-react";
import {Link, useHistory} from  "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {fetchCategoriesThunk} from "../store/thunks/categoryThunks";
import { useEffect } from "react";
import {logout} from "../store/actions/clientActions"
import axiosInstance from "../api/axiosInstance";


export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
   const user = useSelector((state) => state.client.user);
   const cartCount = useSelector((state) => state.shoppingCart.cartCount);
   const cart = useSelector((state) => state.shoppingCart.cart);
const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);
  

const handleLogout = () => {
  localStorage.removeItem("token");
  delete axiosInstance.defaults.headers.common["Authorization"];
  dispatch(logout());
  history.push("/");
};
 
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


      const womenCategories = categories?.filter((cat) => cat.gender === "k") || [];
      const menCategories = categories?.filter((cat) => cat.gender === "e")|| [];
   
console.log("Sepetteki ilk ürünün detayları:", cart[0]?.product);
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

        
        <Link to="/" className="text-xl font-extrabold">
          E-Commerce
        </Link>
      
      <nav className="flex items-center gap-6">
         <Link to="/" className="font-medium">Home</Link>

        <div className="relative group py-4">
  <span className="font-medium cursor-pointer">
    Shop
  </span>

  <div
    className="
      fixed left-0 right-0 top-[80px]
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
      bg-white shadow-2xl
      py-12
      z-50
    "
  >
    <div className="max-w-6xl mx-auto flex gap-32">
      
      {/* WOMEN */}
      <div className="flex flex-col gap-4">
        <Link
          to="/shop/kadin"
          className="font-bold text-lg hover:text-blue-600"
        >
          Kadın
        </Link>

        {womenCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop/${cat.gender}/${slugify(cat.title)}/${cat.id}`}
            className="text-gray-600 hover:text-black text-sm"
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* MEN */}
      <div className="flex flex-col gap-4">
        <Link
          to="/shop/erkek"
          className="font-bold text-lg hover:text-blue-600"
        >
          Erkek
        </Link>

        {menCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop/${cat.gender}/${slugify(cat.title)}/${cat.id}`}
            className="text-gray-600 hover:text-black text-sm"
          >
            {cat.title}
          </Link>
        ))}
      </div>

    </div>
  </div>
</div>





        <Link to="/contact" className="font-medium">Contact</Link>

        <Link to="/team" className="font-medium">Team</Link>
        <Link to="/about" className="font-medium">About Us</Link>
    

      </nav>

        <div className="flex items-center gap-8">

            <Search />
          

         {user ? (
  <div className="relative group flex items-center gap-2 cursor-pointer py-4">
    {/* Kullanıcı Bilgisi ve Dropdown Tetikleyici */}
    <div className="flex items-center gap-1 text-sm font-medium hover:text-orange-600 transition-colors">
      <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
        {user.name ? user.name[0].toUpperCase() : "U"}
      </div>
      <span className="hidden md:inline">{user.name || user.email}</span>
      <ChevronDown size={14} />
    </div>

    {/* Dropdown Menü */}
    <div className="absolute top-full right-0 w-48 bg-white shadow-xl border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[70] py-2">
      
      {/* T23: Geçmiş Siparişlerim Linki */}
      <Link 
        to="/previous-orders" 
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
      >
        <Package size={16} />
        Siparişlerim
      </Link>

      <hr className="my-1 border-gray-100" />

      {/* Logout Butonu */}
      <button 
        onClick={handleLogout} 
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut size={16} />
        Çıkış Yap
      </button>
    </div>
  </div>
) : (
  <Link to="/login" className="hover:text-orange-600 transition-colors">
    <User />
  </Link>
)}

         <div className="relative group">
         <Link to="/cart" className="flex items-center py-4">
         <ShoppingCart/>{cartCount > 0 && (
          <span className="absolute top-2 -right-2 text-xs px-1.5 py-0.5 bg-orange-600 text-white rounded-full">{cartCount}</span>
         )}
         </Link>

         <div className="absolute right-0 top-full w-80 bg-white shadow-xl border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover :visible transition-all duration-200 z-[60] p-4">
         <h3 className="font-bold text-gray-800 border-b pb-2 mb-3">Sepetim ({cart.length} Ürün)</h3>
         <div className="max-h-64 overflow-y-auto custom-scrollbar">
         {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="flex gap-3 py-3 border-b last:border-0 items-center">
              <img 
              src={
                item.product.images?.[0]?.url || item.product.image || item.product.img}
              alt={item.product.name}
              className="w-12 h-12 object-cover rounded"
              onError={(e) => {e.target.src = "https://via.placeholder.com/150";
              }}
              />
              
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs font-semibold text-gray-800 truncate">{item.product.name}</span>
                <span className="text-[10px] text-gray-500">Adet: {item.count}</span>
                <span className="text-xs font-bold text-orange-600">{item.product.price} TL</span>
                </div>

         </div>
          ))
         ) : (
          <p className="text-sm text-gray-500 py-4 text-center">Sepetiniz boş</p>

         )}
         
         </div>

      {cart.length > 0 && (

        <div className="flex gap-2 mt-4">
          <Link to="/cart" className="flex-1 text-center py-2 border border-gray-3 rounded text-xs font-semibold hover:bg-gray-50">Sepete Git</Link>
          <Link to="/order" className="flex-1 text-center py-2 bg-orange-600 text-white rounded text-xs font-semibold hover:bg-orange-700">Siaprişi Tamamla</Link>
          </div>  
      )}
      </div>  
      </div>  
         <Menu />
         </div>
         </div>      
        
    </header>
  );
}


