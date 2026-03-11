
import axiosInstance from "../../api/axiosInstance"; // Axios instance'ını içe aktar

export const SET_CART = "SET_CART";
export const SET_PAYMENT = "SET_PAYMENT";
export const SET_ADDRESS = "SET_ADDRESS";
export const SET_ADDRESS_LIST = "SET_ADDRESS_LIST"; // T20: Tüm adresleri tutmak için
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART_ITEM_COUNT = "UPDATE_CART_ITEM_COUNT";
export const TOGGLE_CART_ITEM_CHECK = "TOGGLE_CART_ITEM_CHECK";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_CARD_LIST = "SET_CARD_LIST";
export const CLEAR_CART = "CLEAR_CART";

// Temel Aksiyonlar
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
});

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const updateCartItemCount = (productId, count) => ({
    type: UPDATE_CART_ITEM_COUNT,
    payload: { productId, count },
});

export const toggleCartItemCheck = (productId) => ({
    type: TOGGLE_CART_ITEM_CHECK,
    payload: productId,
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const setCardList = (cardList) => ({
  type: SET_CARD_LIST,
  payload: cardList,
});

export const clearCart = () => ({
  type: SET_CART,
  payload: []
});

// --- THUNK AKSIYONLARI (T20) ---

// Kayıtlı adresleri API'den çeken fonksiyon
export const fetchAddressList = () => (dispatch) => {
  axiosInstance
    .get("/user/address")
    .then((res) => {
      dispatch(setAddressList(res.data)); // API'den gelen adres listesini state'e yaz
    })
    .catch((err) => {
      console.error("Adres listesi yüklenirken hata oluştu:", err);
    });
};

export const fetchCards = () => (dispatch) => {
  axiosInstance
  .get ("/user/card")
  .then((res) => {
    dispatch(setCardList(res.data));
  })
  .catch((err) => {console.error("Kartlar yüklenemedi:", err);

  });
};