import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Icon, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteUser as deleteUserAction } from "../store/actions";
import { useHistory } from "react-router-dom";
import { getUserById } from "../Backend";

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

export default function MyCard(props) {
  const classes = useStyles();
  const [user, setUser] = useState(props.location.state);

  const dispatch = useDispatch();

  function getUser(id) {
    getUserById(id).then((res) => {
      setUser(res.data);
    });
  }

  useEffect(() => {
    getUser(user.id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function deleteUser() {
    dispatch(deleteUserAction(user));
  }

  function uppercaseFirstLetter(string) {
    return string[0].toUpperCase() + string.substring(1);
  }

  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardContent style={{ paddingBottom: "0px" }}>
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

        {Object.keys(user)
          .filter((e) => e !== "id")
          .map((key, i) => (
            <Grid container key={i}>
              <Grid item xs={3}>
                <Typography className={classes.pos} color="textSecondary">
                  {uppercaseFirstLetter(key)}
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
                  {user[key]}
                </Typography>
              </Grid>
            </Grid>
          ))}
      </CardContent>
      <CardActions className={classes.buttonContainer}>
        <IconButton
          aria-label="delete"
          className={classes.button}
          onClick={deleteUser}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          aria-label="update"
          className={classes.button}
          onClick={() => history.push({ pathname: "addEmployee", state: user })}
        >
          <Edit />
        </IconButton>
      </CardActions>
    </Card>
  );
}
