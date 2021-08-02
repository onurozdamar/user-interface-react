import MyTable from "./MyTable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers as getUsersAction } from "../store/actions";
import { IconButton } from "@material-ui/core";
import { Replay } from "@material-ui/icons";

function Home() {
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
  );
}

export default Home;
