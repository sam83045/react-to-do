import { CONSTANTS } from "../actions";

const initialState = [];


const todoReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case CONSTANTS.LOAD_TODO_LIST: {
            const updatedState = actions.payload;
            return [...updatedState];
        }
        case CONSTANTS.ADD_TODO: {
            const updatedState = [actions.payload, ...state];
            return [...updatedState];
        }
        default: {
            return state;
        }


    }
};

export default todoReducer;