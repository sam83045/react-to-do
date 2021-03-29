import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTodoList, deleteMultipleTodo } from "../redux/actions";
import { todoListSelector } from "../redux/selectors/todoSelectors";
import PropTypes from "prop-types";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { TodoInput } from ".";

const useStyles = makeStyles(() => ({
  root: {},
}));

const TodoList = ({ loadTodoList, todoList, deleteMultipleTodo }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [editTodoId, setEditTodoId] = useState("");
  useEffect(() => {
    loadTodoList();
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const deleteTodo = (todo) => deleteMultipleTodo([todo]);

  return (
    <div className={classes.root}>
      <List dense component="div" role="list">
        {todoList.map((item) => {
          const todoId = `todo-list-item-${item.task}-label`;

          return item.id === editTodoId ? (
            <TodoInput
              initialValues={item}
              key={item.id}
              onUpdate={() => setEditTodoId("")}
              onReset={() => setEditTodoId("")}
            />
          ) : (
            <ListItem
              key={item.id}
              role="listitem"
              button
              onClick={handleToggle(item.id)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(item.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": todoId }}
                />
              </ListItemIcon>
              <ListItemText id={todoId} primary={item.task} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => setEditTodoId(item.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodo(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

TodoList.propTypes = {
  loadTodoList: PropTypes.func.isRequired,
  todoList: PropTypes.array.isRequired,
  deleteMultipleTodo: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    todoList: todoListSelector(state),
  }),
  { loadTodoList, deleteMultipleTodo }
)(TodoList);
