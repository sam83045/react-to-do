import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TodoInput, TodoList } from "../components";

const useStyles = makeStyles(() => ({
  root: {
    margin: "auto",
  },
}));

function TodoPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <TodoInput />
        <TodoList />
      </Grid>
    </div>
  );
}

export default TodoPage;
