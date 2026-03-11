
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-6xl mx-auto p-6">

    
        <div className="grid gap-8 md:grid-cols-3">

         
          <div>
            <h2 className="text-xl font-bold mb-2">E-Commerce</h2>
            <p className="text-sm text-gray-600">
              Modern ve kullanıcı dostu bir e-ticaret arayüzü.
            </p>
          </div>

        
          <div>
            <h3 className="font-semibold mb-2">Sayfalar</h3>
            <ul className="space-y-1 text-sm">
              <li>Home</li>
              <li>Shop</li>
              <li>Contact</li>
              <li>About</li>
            </ul>
          </div>

          
          <div>
            <h3 className="font-semibold mb-2">Bizi Takip Edin</h3>

            <div className="flex items-center gap-4">
              <Facebook />
              <Instagram />
              <Linkedin />
            </div>
          </div>
        </div>

       
        <div className="text-center text-sm text-gray-600 mt-8">
          © 2025 E-Commerce — All rights reserved
        </div>
      </div>
    </footer>
  );
}

