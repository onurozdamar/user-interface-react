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
    "&:hover": {
      backgroundColor: "red",
      cursor: "pointer",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const { employees } = props;
  const history = useHistory();

  return (
    <TableContainer
      component={Paper}
      style={{
        margin: 10,
        alignSelf: "flex-end",
        width: "calc(100% - 50px)",
      }}
    >
      <Table className={classes.table} aria-label="customized table">
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
              onClick={() =>
                history.push({ pathname: "employeeDetail", state: employee })
              }
            >
              <StyledTableCell>{employee.name}</StyledTableCell>
              <StyledTableCell>{employee.email}</StyledTableCell>
              <StyledTableCell>
                {employee.phone}
                <IconButton style={{ position: "absolute", top: 0, right: 0 }}>
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
