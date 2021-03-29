import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { addTodo, updateTodo } from "../redux/actions";
import { v4 as uuid } from "uuid";
import {
  IconButton,
  makeStyles,
  Select,
  TextField,
  MenuItem,
  FormGroup,
  FormControl,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/Save";
import { isEmpty } from "lodash-es";

const useStyles = makeStyles((theme) => ({
  root: {
    button: {
      margin: theme.spacing(0),
    },
    margin: theme.spacing(1, 4, 0),
    "& .MuiFormGroup-options": {
      alignItems: "center",
      "& .MuiSelect-select": {
        width: 60,
      },
      "& .select": {
        marginLeft: theme.spacing(1),
      },
    },
  },
}));
const priorities = [
  { id: "low", displayName: "Low" },
  { id: "medium", displayName: "Medium" },
  { id: "high", displayName: "High" },
];

const TodoInput = ({
  addTodo,
  updateTodo,
  onUpdate = () => {},
  onReset = () => {},
  initialValues = { task: "", priority: "medium" },
}) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (isEmpty(values.id)) {
        addTodo({ ...values, id: uuid() });
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
      <FormGroup className="MuiFormGroup-options" row>
        <FormControl>
          <TextField
            autoFocus
            type="text"
            name="task"
            onChange={formik.handleChange}
            value={formik.values.task}
            placeholder="Enter a todo"
          />
        </FormControl>
        <FormControl>
          <Select
            className="select"
            value={formik.values.priority}
            name="priority"
            onChange={formik.handleChange}
            inputProps={{
              name: "priority",
              id: "priority-native-helper",
            }}
          >
            {priorities.map((priority) => (
              <MenuItem
                value={priority.id}
                key={priority.id}
                aria-label={priority.displayName}
              >
                {priority.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <IconButton
            aria-label="Save"
            color="primary"
            onClick={formik.handleSubmit}
            type="submit"
            disabled={formik.values.task.length === 0}
            edge="end"
          >
            <SaveIcon />
          </IconButton>
        </FormControl>
        <FormControl>
          <IconButton
            aria-label="Cancel"
            color="secondary"
            onClick={() => {
              formik.handleReset();
              onReset();
            }}
            type="reset"
            edge="end"
          >
            <ClearIcon />
          </IconButton>
        </FormControl>
      </FormGroup>
    </form>
  );
};

TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  onUpdate: PropTypes.func,
  onReset: PropTypes.func,
};

export default connect(null, { addTodo, updateTodo })(TodoInput);
