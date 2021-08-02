import MyTable from "./MyTable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers as getUsersAction } from "../store/actions";
import { IconButton } from "@material-ui/core";
import { Replay } from "@material-ui/icons";
import ReactLoading from "react-loading";

function Home() {
  const dispatch = useDispatch();

  const employees = useSelector(({ cardReducer }) => cardReducer.users);
  const refresh = useSelector(({ cardReducer }) => cardReducer.refresh);
  const loading = useSelector(({ cardReducer }) => cardReducer.loading);

  function getUsers() {
    dispatch(getUsersAction());
  }

  useEffect(() => {
    getUsers();
    console.log("eff");
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
            onClick={() => getUsers()}
          >
            <Replay />
          </IconButton>
          <MyTable employees={employees}></MyTable>
        </div>
      )}
    </div>
  );
}

export default Home;
