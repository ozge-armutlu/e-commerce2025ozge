
import { Menu, ShoppingCart, Search, User } from "lucide-react";
import {Link} from  "react-router-dom";

export default function Header() {
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 flex-nowrap">

        
        <Link to="/" className="text-xl font-extrabold shrink-0">
          E-Commerce
        </Link>
      
      <nav className="flex items-center gap-6">
         <Link to="/" className="font-medium">
          Home
        </Link>
        <Link to="/shop" className="font-medium">
           Shop
        </Link>
        <Link to="/contact" className="font-medium">
           Contact
        </Link>
        <Link to="/team" className="font-medium">
           Team
        </Link>
        <Link to="/about" className="font-medium">
           About Us
        </Link>
      </nav>

        <div className="flex items-center gap-8">

          <button>
            <Search />
          </button>

          <button>
            <User />
          </button>
          

          <button>
            <Menu />
          </button>

          <div className="relative">
            <ShoppingCart />

            <span className="absolute -top-2 -right-2 text-xs px-1">
              2
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}


