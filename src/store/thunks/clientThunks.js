import axiosInstance from "../../api/axiosInstance";
import { setRoles } from "../actions/clientActions";

export const fetchRoles = () => {
    return async (dispatchEvent, getState) => {
        const { roles } = getState().client;

        if (roles && roles.length > 0 ) return;

        try {
            const response = await axiosInstance.get("/roles");
            dispatchEvent(setRoles(response.data));
        } catch (error) {
            console.error("FETCH ROLES ERROR:", error);
        }
    };
};