import { combineReducers } from "redux";
import cardReducer from "./card.reducer";

const createReducer = () =>
  combineReducers({
    cardReducer,
  });

export default createReducer;
