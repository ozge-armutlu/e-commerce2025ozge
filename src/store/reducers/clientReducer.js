import { CreditCard } from "lucide-react";

import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE, LOGOUT } from "../actions/clientActions";

const initialState = {
    user: null,
    addressList: [],
    creditCards: [],
    roles: [],
    theme: "light",
    language: "tr",
};


export default function clientReducer(state = initialState, action) {
  

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload };

        case SET_ROLES:
            return {
                ...state,
                roles: action.payload };

            case SET_THEME:
                return {
                    ...state,
                    theme: action.payload };

                case SET_LANGUAGE:
                    return {
                        ...state,
                        language: action.payload };
                        
                case LOGOUT:
                    return {
                        ...state,
                        user: null,
                        roles: []
                    };
                        
                    default:
                        return state;
}
}