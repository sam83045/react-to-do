import get from "lodash/get";

export const todoListSelector = state => get(state, "lists", []);
