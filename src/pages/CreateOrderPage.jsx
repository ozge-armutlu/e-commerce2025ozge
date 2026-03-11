import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom"; 
import { fetchAddressList, fetchCards, setCart } from "../store/actions/shoppingCartActions";
import axiosInstance from "../api/axiosInstance";
import { Plus, Trash2, X, CreditCard, MapPin, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const cities = [
  "İstanbul", "Ankara", "İzmir", "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

export default function CreateOrderPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  // Redux States
  const addressList = useSelector((state) => state.shoppingCart.addressList || []);
  const cardList = useSelector((state) => state.shoppingCart.cardList || []);
  const cart = useSelector((state) => state.shoppingCart.cart || []);

  // Local States
  const [activeTab, setActiveTab] = useState("address");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(fetchAddressList());
    dispatch(fetchCards());
  }, [dispatch]);

  // --- HESAPLAMALAR ---
  const calculateProductTotal = () => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  };
  const productTotal = calculateProductTotal();
  const shippingCost = productTotal > 150 ? 0 : 29.99;
  const grandTotal = (productTotal + shippingCost).toFixed(2);

  // --- ADRES İŞLEMLERİ ---
  const onAddressSubmit = (data) => {
    const payload = {
      title: data.title,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      city: data.city,
      district: data.district,
      neighborhood: data.neighborhood,
      address: data.addressDetail 
    };

    const request = editingAddress 
      ? axiosInstance.put("/user/address", { ...payload, id: editingAddress.id })
      : axiosInstance.post("/user/address", payload);

    request.then(() => {
      toast.success(editingAddress ? "Adres güncellendi!" : "Adres eklendi!");
      dispatch(fetchAddressList());
      closeForm();
    }).catch(() => toast.error("Adres işlemi başarısız."));
  };

  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setShowAddressForm(true);
    setValue("title", addr.title);
    setValue("name", addr.name);
    setValue("surname", addr.surname);
    setValue("phone", addr.phone);
    setValue("city", addr.city);
    setValue("district", addr.district);
    setValue("neighborhood", addr.neighborhood);
    setValue("addressDetail", addr.address);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      axiosInstance.delete(`/user/address/${id}`).then(() => {
        dispatch(fetchAddressList());
        toast.success("Adres silindi.");
      });
    }
  };

  // --- KART İŞLEMLERİ ---
  const onCardSubmit = (data) => {
    const cardPayload = {
      card_no: data.card_no,
      expire_month: parseInt(data.expire_month),
      expire_year: parseInt(data.expire_year),
      name_on_card: data.name_on_card,
    };

    axiosInstance.post("/user/card", cardPayload).then(() => {
      toast.success("Kart kaydedildi!");
      dispatch(fetchCards());
      reset();
    }).catch(() => toast.error("Kart hatası!"));
  };

  // --- T22: SİPARİŞİ TAMAMLA ---
  const handleCreateOrder = () => {
    const orderPayload = {
      address_id: selectedAddress.id,
      order_date: new Date().toISOString(),
      card_no: selectedCard.card_no,
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      card_ccv: 321, 
      price: parseFloat(grandTotal),
      products: cart.map(item => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product.name
      }))
    };

    axiosInstance.post("/order", orderPayload).then(() => {
      toast.success("Siparişiniz onaylandı! Tebrikler.");
      dispatch(setCart([])); // Sepeti temizle
      history.push("/order-success");
    }).catch(() => toast.error("Sipariş oluşturulamadı."));
  };

  const closeForm = () => { setShowAddressForm(false); setEditingAddress(null); reset(); };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-8 min-h-screen bg-gray-50">
      <div className="flex-[3]">
        {/* TAB MENÜ */}
        <div className="flex bg-white rounded-t-lg border-b overflow-hidden shadow-sm mb-6">
          <button onClick={() => setActiveTab("address")} className={`flex-1 p-5 font-bold flex items-center justify-center gap-2 transition-all ${activeTab === "address" ? "bg-orange-50 text-orange-600 border-b-4 border-orange-600" : "text-gray-400 hover:text-gray-600"}`}>
            <MapPin size={20} /> 1. Adres Bilgileri
          </button>
          <button onClick={() => setActiveTab("payment")} className={`flex-1 p-5 font-bold flex items-center justify-center gap-2 transition-all ${activeTab === "payment" ? "bg-orange-50 text-orange-600 border-b-4 border-orange-600" : "text-gray-400 hover:text-gray-600"}`}>
            <CreditCard size={20} /> 2. Ödeme Seçenekleri
          </button>
        </div>

        {/* ADRES SEKMESİ */}
        {activeTab === "address" && (
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Teslimat Adresi</h2>
              <button onClick={() => { setEditingAddress(null); reset(); setShowAddressForm(true); }} className="text-orange-500 font-bold flex items-center gap-1 hover:underline">
                <Plus size={18} /> Yeni Adres Ekle
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addressList.map((addr) => (
                <div key={addr.id} onClick={() => setSelectedAddress(addr)} className={`border-2 p-4 rounded-xl relative cursor-pointer transition-all ${selectedAddress?.id === addr.id ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "border-gray-100 hover:border-orange-200"}`}>
                  {selectedAddress?.id === addr.id && <CheckCircle className="absolute top-2 right-2 text-orange-500" size={20} />}
                  <div className="flex justify-between border-b pb-2 mb-2 uppercase text-[10px] font-bold text-gray-400">
                    <span>{addr.title}</span>
                    <div className="flex gap-3">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(addr); }} className="text-blue-500">Düzenle</button>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr.id); }} className="text-red-500">Sil</button>
                    </div>
                  </div>
                  <p className="font-bold text-gray-800">{addr.name} {addr.surname}</p>
                  <p className="text-xs text-gray-500 mt-1">{addr.phone}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{addr.neighborhood}, {addr.district}/{addr.city}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ÖDEME SEKMESİ */}
        {activeTab === "payment" && (
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Kart Bilgileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {cardList.map((card) => (
                <div key={card.id} onClick={() => setSelectedCard(card)} className={`border-2 p-4 rounded-xl cursor-pointer transition-all ${selectedCard?.id === card.id ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" : "border-gray-100 hover:border-orange-200"}`}>
                  <p className="font-bold">{card.name_on_card}</p>
                  <p className="tracking-widest">**** **** **** {card.card_no.slice(-4)}</p>
                  <p className="text-xs text-gray-500 mt-2">{card.expire_month}/{card.expire_year}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-8">
              <h3 className="font-bold mb-4 text-gray-700">Yeni Kart Ekle</h3>
              <form onSubmit={handleSubmit(onCardSubmit)} className="max-w-md flex flex-col gap-4">
                <input {...register("name_on_card", { required: true })} placeholder="Kart Üzerindeki İsim" className="border p-3 rounded bg-gray-50 focus:bg-white outline-orange-500" />
                <input {...register("card_no", { required: true, minLength: 16 })} placeholder="Kart Numarası" className="border p-3 rounded bg-gray-50 focus:bg-white outline-orange-500" />
                <div className="flex gap-3">
                  <select {...register("expire_month")} className="border p-3 rounded flex-1 bg-gray-50"><option value="">Ay</option>{Array.from({length:12}, (_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}</select>
                  <select {...register("expire_year")} className="border p-3 rounded flex-1 bg-gray-50"><option value="">Yıl</option>{Array.from({length:11}, (_,i)=><option key={i} value={2024+i}>{2024+i}</option>)}</select>
                  <input {...register("cvv")} placeholder="CVV" className="border p-3 rounded w-24 bg-gray-50" />
                </div>
                <button type="submit" className="bg-gray-800 text-white py-3 rounded font-bold hover:bg-black transition-all">Kartı Kaydet</button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* SAĞ TARAF: ÖZET */}
      <div className="flex-1">
        <div className="sticky top-24 bg-white border rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Sipariş Özeti</h2>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between text-gray-600"><span>Ürün Toplamı</span><span className="font-bold">{productTotal.toFixed(2)} TL</span></div>
            <div className="flex justify-between text-gray-600"><span>Kargo</span><span className="font-bold">{shippingCost} TL</span></div>
            {shippingCost === 0 && <div className="text-[10px] text-orange-500 font-bold text-right italic">Kargo Bedava!</div>}
            <div className="border-t pt-4 flex justify-between text-lg font-bold text-orange-600"><span>Genel Toplam</span><span>{grandTotal} TL</span></div>
          </div>
          <button onClick={handleCreateOrder} disabled={!selectedAddress || !selectedCard} className={`w-full mt-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all ${selectedAddress && selectedCard ? "bg-orange-500 hover:bg-orange-600 active:scale-95" : "bg-gray-300 cursor-not-allowed"}`}>
            Siparişi Onayla
          </button>
          <div className="mt-4 text-[10px] text-gray-400 text-center">Onaylayarak satış sözleşmesini kabul etmiş olursunuz.</div>
        </div>
      </div>

      {/* ADRES FORMU MODALI */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
            <button onClick={closeForm} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={24} /></button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{editingAddress ? "Adresi Düzenle" : "Yeni Adres Ekle"}</h2>
            <form onSubmit={handleSubmit(onAddressSubmit)} className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><label className="text-xs font-bold text-gray-500">ADRES BAŞLIĞI</label><input {...register("title", { required: true })} className="w-full border p-3 rounded-lg mt-1" placeholder="Örn: Evim" /></div>
              <div><label className="text-xs font-bold text-gray-500">AD</label><input {...register("name", { required: true })} className="w-full border p-3 rounded-lg mt-1" /></div>
              <div><label className="text-xs font-bold text-gray-500">SOYAD</label><input {...register("surname", { required: true })} className="w-full border p-3 rounded-lg mt-1" /></div>
              <div className="col-span-2"><label className="text-xs font-bold text-gray-500">TELEFON</label><input {...register("phone", { required: true })} className="w-full border p-3 rounded-lg mt-1" /></div>
              <div><label className="text-xs font-bold text-gray-500">ŞEHİR</label><select {...register("city", { required: true })} className="w-full border p-3 rounded-lg mt-1">{cities.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="text-xs font-bold text-gray-500">İLÇE</label><input {...register("district", { required: true })} className="w-full border p-3 rounded-lg mt-1" /></div>
              <div className="col-span-2"><label className="text-xs font-bold text-gray-500">ADRES DETAYI</label><textarea {...register("addressDetail", { required: true })} rows="3" className="w-full border p-3 rounded-lg mt-1" /></div>
              <button type="submit" className="col-span-2 bg-orange-500 text-white py-4 rounded-xl font-bold mt-4 hover:bg-orange-600 shadow-md">Kaydet</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}