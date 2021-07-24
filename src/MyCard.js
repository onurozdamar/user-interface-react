import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Icon, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "react-modal";
import { Edit } from "@material-ui/icons";
import MyForm from "./MyForm";

Modal.setAppElement("#root");

const useStyles = makeStyles({
  root: {
    width: 275,
    backgroundColor: "rgb(122,221,542)",
    position: "relative",
    margin: "10px",
  },
  pos: {
    marginBottom: 12,
    fontSize: 18,
  },
  container: {
    marginBottom: 12,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  button: {
    color: "rgb(240, 10, 10)",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function MyCard(props) {
  const classes = useStyles();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const userInfo = ["Adı", "Soyadı", "Telefon"];

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Counter
        </Typography>

        <Icon
          className="far fa-check-circle"
          style={{
            color: "green",
            position: "absolute",
            margin: "10px",
            top: "0",
            right: "0",
          }}
        />

        {Object.keys(props.user)
          .filter((e) => e !== "id")
          .map((key, i) => (
            <Grid container key={i}>
              <Grid item xs={3}>
                <Typography className={classes.pos} color="textSecondary">
                  {userInfo[i]}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  className={classes.pos}
                  color="error"
                  style={{ textAlign: "center" }}
                >
                  :
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" component="p">
                  {props.user[key]}
                </Typography>
              </Grid>
            </Grid>
          ))}
      </CardContent>
      <CardActions className={classes.buttonContainer}>
        <IconButton aria-label="delete" className={classes.button}>
          <DeleteIcon />
        </IconButton>

        <IconButton
          aria-label="update"
          className={classes.button}
          onClick={openModal}
        >
          <Edit />
        </IconButton>
      </CardActions>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Example Modal"
      >
        <MyForm user={props.user}></MyForm>
      </Modal>
    </Card>
  );
}
