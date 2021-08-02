import MyTable from "./components/MyTable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers as getUsersAction } from "./store/actions";
import { IconButton } from "@material-ui/core";
import { Add, Replay } from "@material-ui/icons";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import MyCard from "./components/MyCard";
import MyForm from "./components/MyForm";

function App() {
  const dispatch = useDispatch();

  const employees = useSelector(({ cardReducer }) => cardReducer.users);
  const loading = useSelector(({ cardReducer }) => cardReducer.loading);

  function getUsers() {
    dispatch(getUsersAction());
  }

  useEffect(() => {
    getUsers();
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/addEmployee" component={MyForm} />
        <Route path="/employeeDetail" component={MyCard} />

        <Route path="/">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignSelf: "flex-start" }}>
              <IconButton onClick={() => getUsers()}>
                <Replay />
              </IconButton>
              <Link to="/addEmployee">
                <IconButton>
                  <Add />
                </IconButton>
              </Link>
            </div>
            <MyTable employees={employees}></MyTable>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
