
import { createSelector, createSelectorCreator } from "reselect";

 const selectShoppingCart = (state) => state.shoppingCart;




export const selectCart = createSelector(
  [selectShoppingCart],
  (shoppingCart) => shoppingCart.cart
);


export const selectCartTotal = createSelector(
  [selectCart],
  (cart) => cart.reduce((total, item) => total + Number(item.product.price) * item.count, 0 )
);


export const selectCartItemCount = createSelector(
  [selectCart],
  (cart) => 
cart.reduce((total, item) => total + item.count, 0 )

);
  
export const selectPayment = createSelector(
[selectShoppingCart],
(shoppingCart) => shoppingCart.payment
);
export const selectAddress = createSelector(
[selectShoppingCart],
(shoppingCart) => shoppingCart.address
);