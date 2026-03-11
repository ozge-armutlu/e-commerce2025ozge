export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";

export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_FILTER = "SET_FILTER";
export const SET_SORT = "SET_SORT";
export const SET_CATEGORY_ID = "SET_CATEGORY_ID";
export const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";
export const SET_LIST_FETCH_STATE = "SET_LIST_FETCH_STATE";
export const SET_DETAIL_FETCH_STATE = "SET_DETAIL_FETCH_STATE";



export const setCategories = (categories) => ({ type: "SET_CATEGORIES", payload: categories });


export const setProductList = (products) => ({
    type: "SET_PRODUCT_LIST",
    payload: products
});

export const setTotal = (total) => ({
    type: "SET_TOTAL",
    payload: total
});




export const setCategoryId = (id) => ({
    type: "SET_CATEGORY_ID",
    payload: id,
});

export const setSelectedProduct = (product) => ({
    type: SET_SELECTED_PRODUCT,
    payload: product,
});

export const setSort = (sort) => ({
    type: "SET_SORT",
    payload: sort,
});

export const setLimit = (limit) => ({
    type: "SET_LIMIT",
    payload: limit
});

export const setOffset = (offset) => ({
    type: "SET_OFFSET",
    payload: offset
});

export const setFilter = (filter) => ({
    type: "SET_FILTER",
    payload: filter
});

export const setListFetchState = (state) => ({
    type: SET_LIST_FETCH_STATE,
    payload: state,
});
export const setDetailFetchState = (state) => ({
    type: SET_DETAIL_FETCH_STATE,
    payload: state,
});