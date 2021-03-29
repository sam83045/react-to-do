import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TodoInput, TodoList } from "../components";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    margin: "auto",
    width: 300,
    paper: {
      overflow: "auto",
    },
  },
}));

function TodoPage() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TodoInput />
      <TodoList />
    </Paper>
  );
}

export default TodoPage;
