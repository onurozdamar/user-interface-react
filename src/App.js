import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import MyCard from "./components/MyCard";
import MyForm from "./components/MyForm";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/addEmployee" component={MyForm} />
        <Route path="/employeeDetail" component={MyCard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
