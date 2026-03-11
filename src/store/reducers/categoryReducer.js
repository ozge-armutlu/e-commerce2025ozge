import { SET_CATEGORIES}  from "../actions/categoryActions";

const initialState = {
    categories: [],
    
};

export default function categoryReducer(state = initialState, action ) {
    switch (action.type) {
        case SET_CATEGORIES:
            return { ...state, categories: action.payload,};

            default:
                return state;
    }

}