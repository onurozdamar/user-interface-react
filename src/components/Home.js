import MyTable from "./MyTable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees as getEmployeesAction } from "../store/actions";
import { IconButton } from "@material-ui/core";
import { Add, Replay } from "@material-ui/icons";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  const employees = useSelector(({ cardReducer }) => cardReducer.employees);
  const refresh = useSelector(({ cardReducer }) => cardReducer.refresh);
  const loading = useSelector(({ cardReducer }) => cardReducer.loading);

  function getEmployees() {
    dispatch(getEmployeesAction());
  }

  useEffect(() => {
    getEmployees();
  }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "f3f2ef",
          }}
        >
          <IconButton
            style={{ display: "flex", alignSelf: "flex-start" }}
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
                backgroundColor: "#292E49",
              }}
            >
              <Add />
            </IconButton>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
