import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementCounter, incrementCounter } from "../store/actions";

export default function Counter() {
  const dispatch = useDispatch();

  const value = useSelector(({ counterReducer }) => counterReducer.counter);

  function handleIncrement() {
    dispatch(incrementCounter());
  }

  function handleDecrement() {
    dispatch(decrementCounter());
  }

  return (
    <div>
      <p>Counter: {value}</p>

      <Button variant="outlined" onClick={handleIncrement}>
        +
      </Button>
      <Button variant="outlined" onClick={handleDecrement}>
        -
      </Button>
    </div>
  );
}
