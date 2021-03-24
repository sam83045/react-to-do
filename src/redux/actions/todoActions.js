import { CONSTANTS } from "./index";

export const loadTodoList = () => {
    return async dispatch => {
        const todoListData = [
            { id: "1", task: "Todo1" },
            { id: "2", task: "Todo2" },
            { id: "3", task: "Todo3" }
        ]
        return dispatch({
            type: CONSTANTS.LOAD_TODO_LIST,
            payload: todoListData
        });
    };
};