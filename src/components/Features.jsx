import { Truck, Headphones, ShieldCheck } from "lucide-react";

export default function Features() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">

   
      <div className="flex items-center gap-3 p-4 border rounded-xl">
        <Truck className="w-8 h-8" />
        <div>
          <h3 className="font-semibold">Free Shipping</h3>
          <p className="text-sm text-gray-600">Orders over $50</p>
        </div>
      </div>

      
      <div className="flex items-center gap-3 p-4 border rounded-xl">
        <Headphones className="w-8 h-8" />
        <div>
          <h3 className="font-semibold">24/7 Support</h3>
          <p className="text-sm text-gray-600">We are here to help</p>
        </div>
      </div>

    
      <div className="flex items-center gap-3 p-4 border rounded-xl">
        <ShieldCheck className="w-8 h-8" />
        <div>
          <h3 className="font-semibold">Secure Payment</h3>
          <p className="text-sm text-gray-600">100% protected</p>
        </div>
      </div>

    </section>
  );
}


