import axiosInstance from "../../api/axiosInstance";

import { setCategories }  from "../actions/categoryActions";

import {toast} from "react-toastify";

export const fetchCategoriesThunk = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/categories");

            dispatch(setCategories(response.data));
        
        } catch (error) {
            toast.error("Kategoriler yüklenmedi");
        }
      

    };
};

