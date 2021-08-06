import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Icon, IconButton, Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { ArrowBack, AttachMoney, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee as deleteEmployeeAction,
  getEmployeeById,
} from "../store/actions";
import { useHistory } from "react-router-dom";
import moment from "moment";
import MyDeleteDialog from "./MyDeleteDialog";
import ReactLoading from "react-loading";
import MyContainer from "./MyContainer";

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
    textAlign: "left",
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
  const id = props.location.state;

  const dispatch = useDispatch();
  const loading = useSelector(({ cardReducer }) => cardReducer.loading);
  const employee = useSelector(({ cardReducer }) => cardReducer.employee);

  function getEmployee(id) {
    dispatch(getEmployeeById(id));
  }

  useEffect(() => {
    getEmployee(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function deleteEmployee(id) {
    dispatch(deleteEmployeeAction(id));
    handleClose();
    history.push({ pathname: "/" });
  }

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  function editPhone(phone) {
    if (!phone) return;
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
        <Paper
          elevation={3}
          variant="outlined"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "f3f2ef",
            minWidth: 700,
            maxWidth: 1200,
            textAlign: "center",
            padding: 20,
            margin: "20px auto",
          }}
        >
          <IconButton
            style={{
              position: "absolute",
              color: "white",
              backgroundColor: "rgba(41,46,73,0.8)",
            }}
            onClick={() => history.push({ pathname: "/" })}
          >
            <ArrowBack />
          </IconButton>
          <h2>Employee Detail</h2>
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
              <MyContainer name="Name" value={employee.name} />
              <MyContainer name="Email" value={employee.email} />
              <MyContainer name="Phone" value={editPhone(employee.phone)} />
              <MyContainer name="Birth Date" date={employee.birthDate} />
              <MyContainer
                name="Gender"
                enum={["Erkek", "Kadın"]}
                enumIndex={employee.gender}
              />
              <MyContainer name="Salary" value={editSalary(employee.salary)}>
                <AttachMoney style={{ position: "absolute", left: -20 }} />
              </MyContainer>
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
        </Paper>
      )}
    </div>
  );
}
