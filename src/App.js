import MyCard from "./components/MyCard";
import MyTable from "./components/MyTable";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers as getUsersAction } from "./store/actions";
import { Button, IconButton } from "@material-ui/core";
import MyCardModal from "./components/MyCardModal";
import { Replay } from "@material-ui/icons";

// TODO: filtre modal
// TODO: siralama modal

const styles = {
  container: {
    width: "75%",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "10px",
    justifyContent: "space-around",
  },
};

function App() {
  const dispatch = useDispatch();

  const employees = useSelector(({ cardReducer }) => cardReducer.users);
  const loading = useSelector(({ cardReducer }) => cardReducer.loading);

  function getUsers() {
    dispatch(getUsersAction());
  }

  useEffect(() => {
    getUsers();
  }, [loading]);

  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    // <div className="App" style={{ margin: "10px" }}>
    //   <div style={styles.container}>
    //     <Button variant="contained" color="primary" onClick={openModal}>
    //       Card Ekle
    //     </Button>
    //     <Button variant="contained" color="primary">
    //       Sırala
    //     </Button>
    //     <Button variant="contained" color="primary">
    //       Filtrele
    //     </Button>
    //   </div>

    //   <div style={styles.container}>
    //     {users.map((user, index) => (
    //       <MyCard key={index} user={user}></MyCard>
    //     ))}
    //   </div>

    //   <MyCardModal showModal={showModal} closeModal={closeModal} />
    // </div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <IconButton style={{ alignSelf: "flex-start" }}>
        <Replay />
      </IconButton>
      <MyTable employees={employees}></MyTable>
    </div>
  );
}

export default App;
