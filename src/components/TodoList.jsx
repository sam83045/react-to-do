import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTodoList, deleteMultipleTodo } from "../redux/actions";
import { todoListSelector } from "../redux/selectors/todoSelectors";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { TodoInput } from ".";
import { isEmpty } from "lodash-es";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: theme.spacing(1, 2),
    MuiListItem: {
      root: {
        backgroundColor: "red",
      },
    },
  },
}));

const ListItem = withStyles((theme) => ({
  root: {
    fontSize: "16px",
    "&.low": {
      color: theme.palette.success.dark,
    },
    "&.medium": {
      color: theme.palette.warning.dark,
    },
    "&.high": {
      color: theme.palette.error.dark,
    },
  },
  selected: {},
}))(MuiListItem);

const TodoList = ({ loadTodoList, todoList, deleteMultipleTodo }) => {
  const classes = useStyles();
  const [checkedTodo, setCheckedTodo] = useState([]);
  const [editTodoId, setEditTodoId] = useState("");
  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    const freshTodoList = checkedTodo.filter(
      (checkedId) =>
        !isEmpty(todoList.find((todoItem) => todoItem.id === checkedId))
    );
    setCheckedTodo(freshTodoList);
  }, [todoList]);

  const handleToggle = (value) => () => {
    const currentIndex = checkedTodo.indexOf(value);
    const newChecked = [...checkedTodo];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedTodo(newChecked);
  };

  const deleteTodo = (todo) => deleteMultipleTodo([todo]);

  const areAllChecked = () =>
    checkedTodo.length === todoList.length && todoList.length !== 0;

  const areSomeChecked = () =>
    checkedTodo.length > 0 && checkedTodo.length < todoList.length;

  const handleToggleAll = () => {
    if (areAllChecked()) {
      setCheckedTodo([]);
    } else {
      setCheckedTodo([]);
      const checkAll = todoList.map((todoItem) => todoItem.id);
      setCheckedTodo(checkAll);
    }
  };

  return (
    <Card>
      <CardHeader
        className={classes.CardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll}
            inputProps={{ "aria-label": "all items selected" }}
            disabled={todoList.length === 0}
            checked={areAllChecked()}
            indeterminate={areSomeChecked()}
          />
        }
        action={
          <IconButton
            aria-label="delete all"
            onClick={() => deleteMultipleTodo(checkedTodo)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        }
        title={`${checkedTodo.length}/${todoList.length} selected`}
      />
      <Divider />
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
              className={item.priority}
              key={item.id}
              role="listitem"
              button
              onClick={handleToggle(item.id)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checkedTodo.indexOf(item.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": todoId }}
                />
              </ListItemIcon>
              <ListItemText id={todoId} primary={item.task} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit todo"
                  onClick={() => setEditTodoId(item.id)}
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete todo"
                  onClick={() => deleteTodo(item.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Card>
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
