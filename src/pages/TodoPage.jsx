import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TodoInput, TodoList } from "../components";
import { Paper } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10,"auto",0,"auto"),
    width: 410,
    paper: {
      overflow: "auto",      
    },
  },
}));

function TodoPage() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={5}>
      <TodoInput />
      <Divider />
      <TodoList />
    </Paper>
  );
}

export default TodoPage;
