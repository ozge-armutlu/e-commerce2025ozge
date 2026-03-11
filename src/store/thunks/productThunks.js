import axiosInstance from "../../api/axiosInstance"; 
import { setProductList, setTotal, setListFetchState, setDetailFetchState, setSelectedProduct } from "../actions/productActions";

export const fetchProducts = () => {
return async (dispatch, getState) => {

dispatch(setListFetchState("FETCHING"));

    

    const {
        categoryId,
        limit,
        offset,
        filter,
        sort 
    } = getState().product;

    

    try {
        const response = await axiosInstance.get("/products", {
            params: {
                limit,
                offset,
                ...(categoryId && { category: categoryId}),
                ...(filter && {filter}),
                ...(sort && {sort}),
            },

        });

        dispatch(setProductList(response.data.products));
        dispatch(setTotal(response.data.total));
        dispatch(setListFetchState("FETCHED"));

    } catch (error) {
        dispatch(setListFetchState("FAILED"));
        console.error("FETCH PRODUCTS ERROR",error);
    }
};
};

export const fetchProductById = (productId) => {
    return async (dispatch) => {

        dispatch(setDetailFetchState("FETCHING"));
        dispatch(setSelectedProduct(null));


        try {
            const response = await axiosInstance.get(
                `/products/${productId}`
            );

            dispatch(setSelectedProduct(response.data));
            dispatch(setDetailFetchState("FETCHED"));
        } catch (error) {
            dispatch(setDetailFetchState("FAILED"));
            console.error("FETCH PRODUCT DETAIL ERROR", error);
        }
    };
};
