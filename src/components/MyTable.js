import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { deleteEmployee as deleteEmployeeAction } from "../store/actions";
import { useDispatch } from "react-redux";
import MyDeleteDialog from "./MyDeleteDialog";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child": {
      backgroundColor: theme.palette.action.selected,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.disabled,
      cursor: "pointer",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    margin: 10,
    marginLeft: 50,
    alignSelf: "flex-start",
    width: "calc(100% - 50px)",
    height: "100%",
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const { employees } = props;
  const history = useHistory();

  const dispatch = useDispatch();

  function deleteEmployee(id) {
    dispatch(deleteEmployeeAction(id));
    handleClose();
  }

  const [openDialog, setOpenDialog] = React.useState({
    open: false,
    emp: null,
  });

  const handleClickOpen = (emp) => {
    setOpenDialog({
      open: true,
      emp: emp,
    });
  };

  const handleClose = () => {
    setOpenDialog({ ...openDialog, open: false });
  };

  function editPhone(phone) {
    if (!phone) {
      return phone;
    }
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

  return (
    <>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {employees.length > 0 &&
                Object.keys(employees[0])
                  .filter((e) => e !== "id")
                  .map((key, index) => {
                    return (
                      <StyledTableCell key={index} style={{ fontSize: 16 }}>
                        {key}
                      </StyledTableCell>
                    );
                  })}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, i) => (
              <StyledTableRow
                key={i}
                style={{ position: "relative" }}
                onClick={(e) => {
                  history.push({ pathname: "employeeDetail", state: employee });
                }}
              >
                <StyledTableCell>{employee.name}</StyledTableCell>
                <StyledTableCell>{employee.email}</StyledTableCell>
                <StyledTableCell>
                  {editPhone(employee.phone)}
                  <IconButton
                    id="delete"
                    style={{
                      zIndex: "20000",
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickOpen(employee);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MyDeleteDialog
        openDialog={openDialog.open}
        onSuccess={() => deleteEmployee(openDialog.emp.id)}
        onFail={handleClose}
      />
    </>
  );
}
