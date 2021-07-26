import { Button } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  postUser as postUserAction,
  updateUser as updateUserAction,
} from "../store/actions";
import MyInput from "./MyInput";

import * as Constants from "../Constants";

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
        .min(3, Constants.NAME_VALIDATION_MESSAGE_MIN)
        .max(20, Constants.NAME_VALIDATION_MESSAGE_MAX)
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(
          Constants.ONLY_LETTER_SPACE,
          Constants.NAME_VALIDATION_MESSAGE_REGEX
        ),
      surname: Yup.string()
        .min(2, Constants.SURNAME_VALIDATION_MESSAGE_MIN)
        .max(20, Constants.SURNAME_VALIDATION_MESSAGE_MAX)
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(
          Constants.ONLY_LETTER,
          Constants.SURNAME_VALIDATION_MESSAGE_REGEX
        ),
      job: Yup.string()
        .min(2, Constants.JOB_VALIDATION_MESSAGE_MIN)
        .max(20, Constants.JOB_VALIDATION_MESSAGE_MAX)
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(
          Constants.ONLY_LETTER_SPACE,
          Constants.JOB_VALIDATION_MESSAGE_REGEX
        ),
      phone: Yup.string()
        .length(11, Constants.PHONE_VALIDATION_MESSAGE_LENGTH)
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(
          Constants.ONLY_DIGIT,
          Constants.PHONE_VALIDATION_MESSAGE_REGEX
        ),
      salary: Yup.string()
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(
          Constants.ONLY_DIGIT,
          Constants.SALARY_VALIDATION_MESSAGE_REGEX
        ),
      age: Yup.string()
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(Constants.ONLY_DIGIT, Constants.AGE_VALIDATION_MESSAGE_REGEX),
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
