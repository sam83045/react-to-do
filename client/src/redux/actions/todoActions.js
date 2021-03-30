import { CONSTANTS } from "./index";
import axios from "../../axios/axios-instance";

export const loadTodoList = () => {
    return async dispatch => {
        const todoList = await axios
            .get("/todo")
            .then(res => res.data);
        return dispatch({
            type: CONSTANTS.LOAD_TODO_LIST,
            payload: todoList
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
