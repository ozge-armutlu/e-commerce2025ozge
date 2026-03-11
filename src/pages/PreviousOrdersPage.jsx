import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { ChevronDown, ChevronUp, Package, Calendar, CreditCard, Tag } from "lucide-react";


export default function PreviousOrdersPage() {
    const [orders, setOrders] =useState([]);
    const [ openOrderId, setOpenOrderId ] = useState(null);

    useEffect(() => {

        axiosInstance.get("/order").then((res) => {
            setOrders(res.data.sort((a, b) => b.id - a.id ));
        })
        .catch((err) => console.error ("Siparişler yüklenemedi:", err));
    }, []);

    const toggleOrder = (id) => {
        setOpenOrderId(openOrderId === id ? null : id );
    };

return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-orange-500 p-2 rounded-lg text-white">
          <Package size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Geçmiş Siparişlerim</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">Henüz bir siparişiniz bulunmuyor.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
              
              {/* SİPARİŞ ÖZET SATIRI (Tıklanabilir Alan) */}
              <div 
                onClick={() => toggleOrder(order.id)}
                className={`p-6 flex flex-wrap justify-between items-center cursor-pointer transition-colors ${openOrderId === order.id ? "bg-orange-50/50" : "hover:bg-gray-50"}`}
              >
                <div className="flex gap-8 flex-wrap">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                      <Calendar size={12} /> Sipariş Tarihi
                    </span>
                    <span className="text-sm font-semibold">{new Date(order.order_date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                      <Tag size={12} /> Toplam Tutar
                    </span>
                    <span className="text-sm font-bold text-orange-600">{order.price.toFixed(2)} TL</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                      <CreditCard size={12} /> Sipariş No
                    </span>
                    <span className="text-sm font-medium text-gray-600">#ORD-{order.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                  {openOrderId === order.id ? "Detayları Gizle" : "Sipariş Detayı"}
                  {openOrderId === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* SİPARİŞ DETAYLARI (Collapsible Panel) */}
              {openOrderId === order.id && (
                <div className="p-6 border-t border-gray-100 bg-white animate-in slide-in-from-top duration-300">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase font-bold">
                          <th className="pb-3">Ürün Bilgisi</th>
                          <th className="pb-3 text-center">Adet</th>
                          <th className="pb-3 text-right">Fiyat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((product, index) => (
                          <tr key={index} className="border-b last:border-0 border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-4">
                              <div className="flex items-center gap-4">
                                <img 
                                  src={product.image || "https://via.placeholder.com/100"} 
                                  className="w-16 h-20 object-cover rounded-lg shadow-sm" 
                                  alt={product.name} 
                                />
                                <div>
                                  <p className="font-bold text-gray-800 text-sm">{product.name}</p>
                                  <p className="text-xs text-gray-500 mt-1 italic">{product.detail}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 text-center font-semibold text-gray-700">{product.count}</td>
                            <td className="py-4 text-right font-bold text-gray-900">
                              {/* API her zaman birim fiyatı vermeyebilir, gerekirse toplamı count'a bölebilirsin */}
                              {product.price} TL
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

