
import { 
  SET_CART, 
  SET_PAYMENT, 
  SET_ADDRESS, 
  SET_ADDRESS_LIST, // T20: Yeni import
  ADD_TO_CART, 
  UPDATE_CART_ITEM_COUNT, 
  TOGGLE_CART_ITEM_CHECK, 
  REMOVE_FROM_CART, SET_CARD_LIST, CLEAR_CART
} from "../actions/shoppingCartActions";

const calculateTotals = (cart) => {
  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.count * item.product.price, 0);
  return { cartCount, cartTotal };
};

const initialState = {
  cart: [],
  payment: null,
  address: null,
  addressList: [], // T20: API'den gelecek adresleri burada tutacağız
  cartCount: 0,
  cartTotal: 0,
  cardList: [],
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART: {
      const { cartCount, cartTotal } = calculateTotals(action.payload);
      return {
        ...state,
        cart: action.payload,
        cartCount,
        cartTotal
      };
    }

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };

    // T20: API'den gelen adres listesini state'e kaydeder
    case SET_ADDRESS_LIST:
      return {
        ...state,
        addressList: action.payload
      };

    case ADD_TO_CART: {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );

      let updatedCart;

      if (existingItemIndex >= 0) {
        updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...state.cart,
          {
            count: 1,
            checked: true,
            product: action.payload,
          },
        ];
      }

      const { cartCount, cartTotal } = calculateTotals(updatedCart);
      
      return {
        ...state,
        cart: updatedCart,
        cartCount,
        cartTotal,
      };
    }

    case UPDATE_CART_ITEM_COUNT: {
      const updatedCart = state.cart.map((item) =>
        item.product.id === action.payload.productId
          ? { ...item, count: Math.max(1, action.payload.count) }
          : item
      );

      const { cartCount, cartTotal } = calculateTotals(updatedCart);

      return {
        ...state,
        cart: updatedCart,
        cartCount,
        cartTotal,
      };
    }

    case TOGGLE_CART_ITEM_CHECK: {
      const updatedCart = state.cart.map((item) =>
        item.product.id === action.payload ? { ...item, checked: !item.checked } : item
      );
      const { cartCount, cartTotal } = calculateTotals(updatedCart);
      return { ...state, cart: updatedCart, cartCount, cartTotal };
    }

    case REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter((item) => item.product.id !== action.payload);
      const { cartCount, cartTotal} = calculateTotals(updatedCart);

      return { 
        ...state,
        cart: updatedCart,
        cartCount,
        cartTotal,
      };
    }

    case SET_CARD_LIST:
      return {
        ...state,
        cardList: action.payload
      };

      case CLEAR_CART:
        return {
          ...state,
          cart: []
        };

    default:
      return state;
  }
}