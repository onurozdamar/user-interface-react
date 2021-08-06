import MyTable from "./MyTable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees as getEmployeesAction } from "../store/actions";
import { Box, IconButton, Paper } from "@material-ui/core";
import { Add, Replay } from "@material-ui/icons";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  const employees = useSelector(({ cardReducer }) => cardReducer.employees);
  const loading = useSelector(({ cardReducer }) => cardReducer.loading);

  function getEmployees() {
    dispatch(getEmployeesAction());
  }

  useEffect(() => {
    getEmployees();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      {loading ? (
        <ReactLoading
          type="bars"
          color="red"
          style={{
            display: "flex",
            justifyContent: "center",
            color: "black",
            width: 100,
            height: 100,
            margin: "50px auto",
          }}
        />
      ) : (
        <Paper
          elevation={3}
          variant="outlined"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "f3f2ef",
            minWidth: 700,
            maxWidth: 1200,
            height: "90%",
            padding: 20,
            textAlign: "center",
            margin: "20px auto",
          }}
        >
          <h2>Employees</h2>
          <IconButton
            style={{
              display: "flex",
              position: "absolute",
              color: "white",
              backgroundColor: "rgba(41,46,73,0.8)",
            }}
            onClick={() => getEmployees()}
          >
            <Replay />
          </IconButton>
          <MyTable employees={employees}></MyTable>
          <Link
            to="/addEmployee"
            style={{ display: "flex", alignSelf: "flex-end", margin: 5 }}
          >
            <IconButton
              style={{
                color: "white",
                backgroundColor: "rgba(41,46,73,0.8)",
              }}
            >
              <Add />
            </IconButton>
          </Link>
        </Paper>
      )}
    </div>
  );
}

export default Home;
