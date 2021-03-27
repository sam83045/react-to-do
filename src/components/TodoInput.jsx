import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { addTodo } from "../redux/actions";

const TodoInput = ({ addTodo }) => {
  const formik = useFormik({
    initialValues: {
      todo: "",
    },
    onSubmit: (values) => {
      addTodo({ task: values.todo });
      formik.handleReset();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="todo"
        onChange={formik.handleChange}
        value={formik.values.todo}
      />
      <button type="submit">Submit</button>
      <button type="reset" onClick={formik.handleReset}>
        Reset
      </button>
    </form>
  );
};

TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default connect(null, { addTodo })(TodoInput);
