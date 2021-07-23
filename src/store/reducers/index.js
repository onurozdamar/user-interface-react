import { combineReducers } from "redux";
import counterReducer from "./counter.reducer";
import cardReducer from "./card.reducer";

const createReducer = () =>
  combineReducers({
    counterReducer,
    cardReducer,
  });

export default createReducer;
