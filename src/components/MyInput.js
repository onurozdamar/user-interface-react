import { makeStyles, TextField } from "@material-ui/core";
import { useField } from "formik";

function MyInput(props) {
  const [field, meta] = useField(props);

  const useStyles = makeStyles({
    root: {
      color: "white",
      margin: "10px",
    },
  });

  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      variant="outlined"
      error={meta.error ? true : false}
      {...props}
      {...field}
    >
      {props.children}
    </TextField>
  );
}

export default MyInput;
