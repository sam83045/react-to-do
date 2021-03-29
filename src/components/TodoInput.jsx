import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { addTodo, updateTodo } from "../redux/actions";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import { Grid } from "@material-ui/core";
import { isEmpty } from "lodash-es";

const useStyles = makeStyles(() => ({}));

const TodoInput = ({
  addTodo,
  updateTodo,
  onUpdate = () => {},
  initialValues = { task: "" },
}) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (isEmpty(values.id)) {
        addTodo({ task: values.task, id: uuid() });
        formik.handleReset();
      } else {
        updateTodo(values);
        onUpdate();
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <Grid container>
        <Grid item xs={8}>
          <TextField
            autoFocus
            type="text"
            name="task"
            onChange={formik.handleChange}
            value={formik.values.task}
            placeholder="Enter a todo"
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="Save"
            color="primary"
            onClick={formik.handleSubmit}
            type="submit"
          >
            <SaveIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="Cancel"
            color="secondary"
            onClick={formik.handleReset}
            type="reset"
          >
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default connect(null, { addTodo, updateTodo })(TodoInput);
