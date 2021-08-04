import { makeStyles, TextField } from "@material-ui/core";
import { useField } from "formik";
import { useState } from "react";

function MyPhoneInput(props) {
  const [field, meta, helperText] = useField(props);

  const useStyles = makeStyles({
    root: {
      color: "white",
      flex: 1,
      marginLeft: 5,
    },
  });

  const classes = useStyles();

  const [val, setVal] = useState(field.value);

  function handleChange(phone) {
    phone = phone.replaceAll(" ", "").replace("(", "").replace(")", "");
    field.value = phone;

    let edited = "";

    if (phone.length === 1 && phone !== "+") {
      edited += "+90";
    }

    for (let index = 0; index < phone.length; index++) {
      const element = phone[index];
      if (index === 3) {
        edited += " (";
      }
      if (index === 6) {
        edited += ")";
      }
      if (index === 6 || index === 9 || index === 11) {
        edited += " " + element;
      } else {
        edited += element;
      }
    }

    setVal(edited);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", margin: 10 }}>
      {props.icon}
      <TextField
        className={classes.root}
        variant="outlined"
        error={meta.error ? true : false}
        {...props}
        {...field}
        value={val}
        onChange={(e) => {
          handleChange(e.target.value);
          console.log(e.target.value + "/" + field.value);
          helperText.setValue(field.value);
        }}
      />
    </div>
  );
}

export default MyPhoneInput;
