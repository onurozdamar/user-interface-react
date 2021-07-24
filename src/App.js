import MyCard from "./components/MyCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers as getUsersAction } from "./store/actions";
import { Button } from "@material-ui/core";
import MyCardModal from "./components/MyCardModal";

// TODO: add ve update modal
// TODO: delete button
// TODO: filtre modal
// TODO: card liste

const styles = {
  container: {
    width: "75%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "10px",
    justifyContent: "space-around",
  },
};

function App() {
  const dispatch = useDispatch();

  const users = useSelector(({ cardReducer }) => cardReducer.users);

  function getUsers() {
    dispatch(getUsersAction());
  }

  useEffect(() => {
    getUsers();
  }, [users.length]);

  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="App" style={{ margin: "10px" }}>
      <div style={styles.container}>
        <Button variant="contained" color="primary" onClick={openModal}>
          Card Ekle
        </Button>
        <Button variant="contained" color="primary">
          Sırala
        </Button>
        <Button variant="contained" color="primary">
          Filtrele
        </Button>
      </div>

      <div style={styles.container}>
        {users.map((user) => (
          <MyCard key={user.id} user={user}></MyCard>
        ))}
      </div>

      <MyCardModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
}

export default App;
