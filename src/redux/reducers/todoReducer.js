import { CONSTANTS } from "../actions";

const initialState = [];


const todoReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case CONSTANTS.LOAD_TODO_LIST: {
            const updatedState = actions.payload;
            return [...updatedState];
        }
        case CONSTANTS.ADD_TODO: {
            return [actions.payload, ...state];
        }
        case CONSTANTS.DELETE_MULTIPLE_TODO: {
            return state.reduce((newTodo, currentTodo) => {
                if (actions.payload.find(itemToRemove => itemToRemove === currentTodo.id)) {
                    return newTodo;
                } else {
                    return [...newTodo, currentTodo];
                }

            }, []);
        }
        case CONSTANTS.UPDATE_TODO: {
            const indexOfTodo = state.findIndex(todo => todo.id === actions.payload.id);
            return [...state.slice(0, indexOfTodo), actions.payload, ...state.slice(indexOfTodo + 1)];
        }
        default: {
            return state;
        }


    }
};

export default todoReducer;