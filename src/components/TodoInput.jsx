import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { addTodo } from "../redux/actions";
import { v4 as uuid } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";
import useStyles from "../theme";
import SaveIcon from "@material-ui/icons/Save";

const TodoInput = ({ addTodo }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      todo: "",
    },
    onSubmit: (values) => {
      addTodo({ task: values.todo, id: uuid() });
      formik.handleReset();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <TextField
        type="text"
        name="todo"
        onChange={formik.handleChange}
        value={formik.values.todo}
        placeholder="Enter a todo"
      />
      <IconButton
        aria-label="Save"
        color="primary"
        onClick={formik.handleSubmit}
        type="submit"
        >
        <SaveIcon />
      </IconButton>
      <IconButton
        aria-label="Cancel"
        color="secondary"
        onClick={formik.handleReset}
        type="reset"
      >
        <ClearIcon />
      </IconButton>
    </form>
  );
};

TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default connect(null, { addTodo })(TodoInput);
