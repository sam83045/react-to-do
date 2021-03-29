import { CONSTANTS } from "./index";

const todoListData = [
    { id: "1", task: "Todo1" },
    { id: "2", task: "Todo2" },
    { id: "3", task: "Todo3" }
];

export const loadTodoList = () => {
    return async dispatch => {
        return dispatch({
            type: CONSTANTS.LOAD_TODO_LIST,
            payload: todoListData
        });
    };
};

export const addTodo = (item) => {
    return async dispatch => {
        return dispatch({
            type: CONSTANTS.ADD_TODO,
            payload: item
        })
    }
};

export const deleteMultipleTodo = (items) => {
    return async dispatch => {
        return dispatch({
            type: CONSTANTS.DELETE_MULTIPLE_TODO,
            payload: items
        })
    }
};

export const updateTodo = item => {
    return async dispatch => {
        return dispatch({
            type: CONSTANTS.UPDATE_TODO,
            payload: item
        })
    }
};
