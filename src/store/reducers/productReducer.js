
import { SET_PRODUCT_LIST, SET_TOTAL, SET_CATEGORY_ID, SET_LIMIT, SET_OFFSET, SET_FILTER, SET_SORT, SET_SELECTED_PRODUCT, SET_LIST_FETCH_STATE, SET_DETAIL_FETCH_STATE } from "../actions/productActions";


const initialState = {
  productList: [],
  selectedProduct: null,

  listFetchState: "NOT_FETCHED",
  detailFetchState: "NOT_FETCHED",

  total: 0,
  
  categoryId: null,
  sort: "",
  filter: "",
  limit: 25,
  offset: 0,
};



export default function productReducer(state = initialState, action) {
    switch (action.type) {
        

            case SET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload
            };

            case SET_TOTAL:
            return {
                ...state,
                total: action.payload
            };

            

            case SET_CATEGORY_ID:
                return {
                    ...state,
                    categoryId: action.payload,
                    offset: 0,
                };

            case SET_LIMIT:
            return {
                ...state,
                limit: action.payload,
                offset: 0,
            };

            case SET_OFFSET:
            return {
                ...state,
                offset: action.payload
            };
            
            case SET_FILTER:
            return {
                ...state,
                filter: action.payload,
                offset: 0
            };

            case SET_SORT:
                return {
                    ...state,
                    sort: action.payload,
                    offset: 0
                };
           case SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload,
            };

            case SET_LIST_FETCH_STATE:
                return {
                    ...state,
                    listFetchState: action.payload,
                };

                case SET_DETAIL_FETCH_STATE:
                    return {
                        ...state,
                        detailFetchState: action.payload,
                    };

            default:
                return state;
    }
}