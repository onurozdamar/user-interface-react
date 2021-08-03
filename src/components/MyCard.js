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
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee as deleteEmployeeAction,
  setLoading,
} from "../store/actions";
import { useHistory } from "react-router-dom";
import { getEmployeeById } from "../Backend";
import moment from "moment";
import localization from "moment/locale/tr";
import MyDeleteDialog from "./MyDeleteDialog";
import ReactLoading from "react-loading";

const useStyles = makeStyles({
  root: {
    width: 700,
    background: "#536976" /* fallback for old browsers */,
    background:
      "-webkit-linear-gradient(to right, #292E49 , #536976 )" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #292E49 , #536976 )" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    position: "relative",
    color: "rgb(250, 250, 250)",
    margin: "10px auto",
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
    color: "rgb(255, 250, 100)",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});

export default function MyCard(props) {
  const classes = useStyles();
  const [employee, setEmployee] = useState(props.location.state);

  const dispatch = useDispatch();
  const loading = useSelector(({ cardReducer }) => cardReducer.loading);

  function getEmployee(id) {
    dispatch(setLoading(true));
    getEmployeeById(id)
      .then((res) => {
        dispatch(setLoading(false));
        setEmployee(res.data);
      })
      .catch((e) => {
        console.log("get by id hata", e);
        dispatch(setLoading(false));
        setEmployee({});
      });
  }

  useEffect(() => {
    getEmployee(employee.id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function deleteEmployee(id) {
    dispatch(deleteEmployeeAction(id));
    handleClose();
    history.goBack();
  }

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  function uppercaseFirstLetter(string) {
    return string[0].toUpperCase() + string.substring(1);
  }

  function editPhone(phone) {
    return (
      phone.slice(0, 1) +
      " " +
      phone.slice(4, 7) +
      " " +
      phone.slice(7, 9) +
      " " +
      phone.slice(9, 11)
    );
  }

  const history = useHistory();

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
        <>
          <Card className={classes.root}>
            <CardContent style={{ paddingBottom: "0px" }}>
              <Typography variant="h5" component="h2">
                Employee
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

              {Object.keys(employee)
                .filter((e) => e !== "id")
                .map((key, i) => (
                  <Grid container key={i}>
                    <Grid item xs={3}>
                      <Typography className={classes.pos}>
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
                        {key === "birthDate"
                          ? moment(employee[key])
                              .locale("tr", localization)
                              .format("LL")
                          : key === "phone"
                          ? editPhone(employee[key])
                          : key === "gender"
                          ? employee[key] == 0
                            ? "Erkek"
                            : "Kadın"
                          : employee[key]}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
            </CardContent>
            <CardActions className={classes.buttonContainer}>
              <IconButton
                aria-label="delete"
                className={classes.button}
                onClick={() => handleClickOpen()}
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                aria-label="update"
                className={classes.button}
                onClick={() =>
                  history.push({ pathname: "addEmployee", state: employee })
                }
              >
                <Edit />
              </IconButton>
            </CardActions>
          </Card>
          <MyDeleteDialog
            openDialog={openDialog}
            onSuccess={() => deleteEmployee(employee.id)}
            onFail={handleClose}
          />
        </>
      )}
    </div>
  );
}
