import { useEffect } from "react";
import { connect } from "react-redux";
import { loadTodoList } from "../redux/actions";

const TodoList = ({ loadTodoList }) => {
  useEffect(() => {
    loadTodoList();
  });
  return <h1>Hello Todo list</h1>;
};

export default connect(null, { loadTodoList })(TodoList);
