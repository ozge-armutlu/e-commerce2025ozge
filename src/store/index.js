import {createStore, combineReducers, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import logger from "redux-logger";


import clientReducer from "./reducers/clientReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import categoryReducer from "./reducers/categoryReducer";


const rootReducer = combineReducers ({
client: clientReducer,
product: productReducer,
shoppingCart: shoppingCartReducer,
category: categoryReducer,

});


const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);
export default store;