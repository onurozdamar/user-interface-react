import { Button } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  postUser as postUserAction,
  updateUser as updateUserAction,
} from "../store/actions";
import MyInput from "./MyInput";

function MyForm(props) {
  const dispatch = useDispatch();
  const { user } = props;

  function postUser(user) {
    dispatch(postUserAction(user));
  }

  function updateUser(user, id) {
    dispatch(updateUserAction(user, id));
  }

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : "",
      surname: user ? user.surname : "",
      age: user ? user.age : "",
      phone: user ? user.phone : "",
      job: user ? user.job : "",
      salary: user ? user.salary : "",
    },
    onSubmit: (values) => {
      if (user) {
        updateUser(values, user ? user.id : null);
      } else {
        postUser(values);
      }
      props.closeModal();
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must be less then 20 characters")
        .required("Name is required")
        .matches(
          /^[A-Za-züÜıİğĞÖöçÇşŞ]+$/,
          "Name cannot contain special characters or spaces"
        ),
      surname: Yup.string()
        .min(2, "Surname must be at least 2 characters")
        .max(20, "Surname must be less then 20 characters")
        .required("Surname is required")
        .matches(
          /^[A-Za-züÜıİğĞÖöçÇşŞ]+$/,
          "Surname cannot contain special characters or spaces"
        ),
      job: Yup.string()
        .min(2, "Job must be at least 2 characters")
        .max(20, "Job must be less then 20 characters")
        .required("Job is required")
        .matches(
          /^[A-Za-züÜıİğĞÖöçÇşŞ ]+$/,
          "Job cannot contain special characters or spaces"
        ),
      phone: Yup.string()
        .length(11, "Phone must be 11 digit")
        .required("Phone is required")
        .matches(/^\d+$/, "Phone can contain only numbers"),
      salary: Yup.string()
        .min(1, "Salary must be at least 1 characters")
        .required("Salary is required")
        .matches(/^\d+$/, "Salary can contain only numbers"),
      age: Yup.string()
        .min(1, "Age must be at least 1 characters")
        .required("Age is required")
        .matches(/^\d+$/, "Age can contain only numbers"),
    }),
  });

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <MyInput
          label="Name"
          id="name"
          name="name"
          helperText={formik.errors.name}
          type="text"
          required
        />
        <MyInput
          label="Surname"
          id="surname"
          name="surname"
          helperText={formik.errors.surname}
          type="text"
          required
        />
        <MyInput
          label="Age"
          id="age"
          name="age"
          helperText={formik.errors.age}
          type="text"
          required
        />
        <MyInput
          label="Phone"
          id="phone"
          name="phone"
          helperText={formik.errors.phone}
          type="text"
          required
        />
        <MyInput
          label="Job"
          id="job"
          name="job"
          helperText={formik.errors.job}
          type="text"
          required
        />
        <MyInput
          label="Salary"
          id="salary"
          name="salary"
          helperText={formik.errors.salary}
          type="text"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formik.isValid || !formik.dirty}
        >
          Save
        </Button>
      </Form>
    </FormikProvider>
  );
}

export default MyForm;
