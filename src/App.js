import MyCard from "./MyCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers as getUsersAction } from "./store/actions";

// TODO: asas
// TODO: add ve update modal
// TODO: delete button
// TODO: filtre modal
// TODO: card liste

function App() {
  const dispatch = useDispatch();

  const users = useSelector(({ cardReducer }) => cardReducer.users);

  function getUsers() {
    dispatch(getUsersAction());
  }

  useEffect(() => {
    getUsers();
  }, [users.length]);

  return (
    <div className="App" style={{ margin: "10px" }}>
      {users.map((e) => (
        <MyCard key={e.id} user={e}></MyCard>
      ))}
    </div>
  );
}

export default App;
