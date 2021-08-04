import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Icon, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { AttachMoney, Edit } from "@material-ui/icons";
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
    margin: "30px auto",
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

  function editPhone(phone) {
    return (
      phone.slice(0, 3) +
      " " +
      phone.slice(3, 6) +
      " " +
      phone.slice(6, 9) +
      " " +
      phone.slice(9, 11) +
      " " +
      phone.slice(11, 13)
    );
  }

  function editSalary(salary) {
    salary = salary + "";
    let reverseEdited = "";

    for (let index = 0; index < salary.length; index++) {
      const element = salary[salary.length - index - 1];
      if (index > 0 && index % 3 === 0) {
        reverseEdited += ".";
      }
      reverseEdited += element;
    }

    let edited = "";

    for (let index = reverseEdited.length - 1; index >= 0; index--) {
      const element = reverseEdited[index];
      edited += element;
    }

    return edited;
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
              <Grid container style={{ margin: 10 }}>
                <Grid item xs={3}>
                  <Typography className={classes.pos}>Name</Typography>
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
                    {employee.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ margin: 10 }}>
                <Grid item xs={3}>
                  <Typography className={classes.pos}>Email</Typography>
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
                    {employee.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ margin: 10 }}>
                <Grid item xs={3}>
                  <Typography className={classes.pos}>Phone</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    className={classes.phone}
                    color="error"
                    style={{ textAlign: "center" }}
                  >
                    :
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" component="p">
                    {editPhone(employee.phone)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ margin: 10 }}>
                <Grid item xs={3}>
                  <Typography className={classes.pos}>Birth Date</Typography>
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
                    {moment(employee.birthDate)
                      .locale("tr", localization)
                      .format("LL")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ margin: 10 }}>
                <Grid item xs={3}>
                  <Typography className={classes.pos}>Gender</Typography>
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
                    {employee.gender === 0 ? "Erkek" : "Kadın"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ margin: 10 }}>
                <Grid item xs={3}>
                  <Typography className={classes.pos}>Salary</Typography>
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
                <Grid item xs={3} style={{ position: "relative" }}>
                  <Typography variant="subtitle1" component="p">
                    {
                      <AttachMoney
                        style={{ position: "absolute", left: -20 }}
                      />
                    }
                    {editSalary(employee.salary)}
                  </Typography>
                </Grid>
              </Grid>
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
