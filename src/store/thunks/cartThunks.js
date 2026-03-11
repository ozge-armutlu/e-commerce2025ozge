import { ADD_TO_CART, SET_CART } from "../actions/shoppingCartActions";

// Ürün ekleme
export const addToCart = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };
};


// Ürün silme
export const removeFromCart = (productId) => {
  return (dispatch, getState) => {
    const { cart } = getState().shoppingCart;

    const updatedCart = cart.filter(
      (item) => item.product.id !== productId
    );

    dispatch({
      type: SET_CART,
      payload: updatedCart,
    });
  };
};


// Sepeti temizleme
export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: SET_CART,
      payload: [],
    });
  };
};