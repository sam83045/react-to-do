import React,{ useEffect } from "react";
import { connect } from "react-redux";
import { loadTodoList } from "../redux/actions";
import { todoListSelector } from "../redux/selectors/todoSelectors";
import PropTypes from "prop-types";

const TodoList = ({ loadTodoList, todoList }) => {
  useEffect(() => {
    loadTodoList();
  },[]);
  return (
    <>
      <h1>Hello Todo list</h1>
      {todoList.map((item) => item.task)}
    </>
  );
};

TodoList.propTypes={
    loadTodoList: PropTypes.func.isRequired,
    todoList: PropTypes.array.isRequired
}

export default connect(
  (state) => ({
    todoList: todoListSelector(state),
  }),
  { loadTodoList }
)(TodoList);
