import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeFromCart, clearCart } from "../store/thunks/cartThunks";
import { selectCart, selectCartTotal, selectCartItemCount } from "../store/selectors/shoppingCartSelectors";
import { updateCartItemCount, toggleCartItemCheck } from "../store/actions/shoppingCartActions";
import { Trash2, Plus, Minus, ChevronRight } from "lucide-react";

export default function CartPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const total = useSelector(selectCartTotal);
    const itemCount = useSelector(selectCartItemCount);

    // T19: Sipariş Özeti Hesaplamaları
    const shippingPrice = total > 150 ? 0 : 29.99; 
    const discount = total > 1000 ? 50 : 0; 
    const grandTotal = total + shippingPrice - discount;

    // T20: Güvenli Ödeme Sayfasına Yönlendirme
    const handleProceedToCheckout = () => {
        history.push("/create-order");
    };

    const handleCountChange = (productId, currentCount, delta) => {
        const newCount = currentCount + delta;
        if (newCount >= 1) {
            dispatch(updateCartItemCount(productId, newCount));
        }
    };

    const handleToggleCheck = (productId) => {
        dispatch(toggleCartItemCheck(productId));
    };

    if (!cart || cart.length === 0) {
        return (
            <div className="p-12 text-center">
                <p className="text-xl text-gray-500">Sepetiniz şu an boş!</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
            
            {/* SOL TARAF: Ürün Listesi (T18) */}
            <div className="flex-[2]">
                <h1 className="text-2xl font-bold mb-6 border-b pb-4">Sepetim ({itemCount} Ürün)</h1>
                
                <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-4 border p-4 rounded-lg bg-white shadow-sm transition-all hover:border-orange-200">
                            
                            <input 
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleToggleCheck(item.product.id)}
                                className="w-5 h-5 accent-orange-500 cursor-pointer"
                            />

                            <img 
                                src={item.product.images?.[0]?.url || item.product.image || "https://via.placeholder.com/150"} 
                                alt={item.product.name}
                                className="w-20 h-20 object-cover rounded border"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 line-clamp-1">{item.product.name}</h3>
                                <p className="text-sm text-gray-500">Fiyat: {item.product.price.toFixed(2)} TL</p>
                            </div>

                            <div className="flex items-center border rounded-md overflow-hidden bg-gray-50">
                                <button 
                                    onClick={() => handleCountChange(item.product.id, item.count, -1)}
                                    className="p-2 hover:bg-gray-200 transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-4 font-bold text-sm">{item.count}</span>
                                <button 
                                    onClick={() => handleCountChange(item.product.id, item.count, 1)}
                                    className="p-2 hover:bg-gray-200 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="w-24 text-right font-bold text-orange-600">
                                {(item.product.price * item.count).toFixed(2)} TL
                            </div>

                            <button 
                                onClick={() => dispatch(removeFromCart(item.product.id))} 
                                className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => dispatch(clearCart())} 
                    className="mt-6 text-gray-400 hover:text-red-600 flex items-center gap-2 text-sm font-medium transition-colors"
                >
                    <Trash2 size={16} /> Sepeti Temizle
                </button>
            </div>

            {/* SAĞ TARAF: Sipariş Özeti Kutusu (T19) */}
            <div className="flex-1">
                <div className="sticky top-24 flex flex-col gap-4">
                    
                    {/* Üstteki Onay Butonu (T20 eklendi) */}
                    <button 
                        onClick={handleProceedToCheckout}
                        className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                        Sepeti Onayla <ChevronRight size={20} />
                    </button>

                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Sipariş Özeti</h2>
                        
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Ürünün Toplamı</span>
                                <span className="font-bold text-gray-800">{total.toFixed(2)} TL</span>
                            </div>
                            
                            <div className="flex justify-between text-gray-600">
                                <span>Kargo Toplam</span>
                                <span className="font-bold text-gray-800">29.99 TL</span>
                            </div>

                            {shippingPrice === 0 && (
                                <div className="flex justify-between text-orange-500 font-medium">
                                    <span>150 TL ve Üzeri Kargo Bedava</span>
                                    <span className="font-bold">-29.99 TL</span>
                                </div>
                            )}

                            {discount > 0 && (
                                <div className="flex justify-between text-green-600 font-medium border-t pt-2">
                                    <span>Kampanya İndirimi</span>
                                    <span>-{discount.toFixed(2)} TL</span>
                                </div>
                            )}

                            <div className="flex justify-between text-lg font-extrabold text-orange-600 border-t pt-4 mt-2">
                                <span>Toplam</span>
                                <span>{grandTotal.toFixed(2)} TL</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center gap-2 text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors">
                       <Plus size={16} /> <span className="text-xs font-bold uppercase tracking-wider">İndirim Kodu Gir</span>
                    </div>

                    {/* Alttaki Onay Butonu (T20 eklendi) */}
                    <button 
                        onClick={handleProceedToCheckout}
                        className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                        Sepeti Onayla <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}