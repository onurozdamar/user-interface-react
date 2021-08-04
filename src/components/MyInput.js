import { makeStyles, TextField } from "@material-ui/core";
import { useField } from "formik";

function MyInput(props) {
  const [field, meta] = useField(props);

  const useStyles = makeStyles({
    root: {
      color: "white",
      flex: 1,
      marginLeft: 5,
      textAlign: "left",
    },
  });

  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "row", margin: 10 }}>
      {props.icon}
      <TextField
        className={classes.root}
        variant="outlined"
        error={meta.error ? true : false}
        {...props}
        {...field}
      >
        {props.children}
      </TextField>
    </div>
  );
}

export default MyInput;
