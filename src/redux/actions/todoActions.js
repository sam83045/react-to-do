import { CONSTANTS } from "./index";

export const loadTodoList = () => {
    return async dispatch => {
      const todoListData = [
          {"1":"Todo1"},
          {"2":"Todo2"},
          {"3":"Todo3"}
      ]
      return dispatch({
        type: CONSTANTS.LOAD_TODO_LIST,
        payload: todoListData
      });
    };
  };