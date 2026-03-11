import axiosInstance from "../../api/axiosInstance";
import { setUser, logout } from "../actions/clientActions";
import {toast} from "react-toastify";





export const loginThunk = (formData, redirectPath, history) => {

    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/login", {

                email: formData.email,
                password: formData.password,
            });
            
            const token = response.data.token;
             const user = response.data.user ? response.data.user : {

                email: response.data.email,
                name: response.data.name,
             };
             
            dispatch(setUser(user));


            if (formData.rememberMe) {
                localStorage.setItem("token", token);
                axiosInstance.defaults.headers.common["Authorization"] = token;
            }
            toast.success("Başarıyla giriş yaptın");

           history.push(redirectPath);
        } catch (error) {
            console.log("LOGIN ERROR:", error);
              toast.error("Email ya da şifre yanlış");
        }
    };
};

export const checkAuthThunk = () => {
 
    return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {

        axiosInstance.defaults.headers.common["Authorization"] = token;
        const response = await axiosInstance.get("/verify");

        const user = response.data.user ? response.data.user : response.data;

        const newToken = response.data.token || token;

        dispatch(setUser(user));


        localStorage.setItem("token", newToken);
        axiosInstance.defaults.headers.common["Authorization"] = newToken;

    } catch(error) {
        localStorage.removeItem("token");
        delete axiosInstance.defaults.headers.common["Authorization"];
        dispatch(logout());
    }
    };
};