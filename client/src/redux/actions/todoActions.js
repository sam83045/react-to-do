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

export const addTodo = (data) => {
    return async dispatch => {
        await axios
            .post("/todo/create", {
                data
            });
        return dispatch({
            type: CONSTANTS.ADD_TODO,
            payload: data
        })
    }
};

export const deleteMultipleTodo = (data) => {
    return async dispatch => {
        await axios.post(`/todo/delete`, { data });
        return dispatch({
            type: CONSTANTS.DELETE_MULTIPLE_TODO,
            payload: data
        })
    }
};

export const updateTodo = data => {
    return async dispatch => {
        await axios.post(`/todo/update`, { data });
        return dispatch({
            type: CONSTANTS.UPDATE_TODO,
            payload: data
        })
    }
};
