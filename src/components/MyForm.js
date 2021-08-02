import {
  Button,
  MenuItem,
  TextField,
  InputLabel,
  Select,
} from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  postUser as postUserAction,
  updateUser as updateUserAction,
} from "../store/actions";
import MyInput from "./MyInput";
import * as Constants from "../Constants";
import { useHistory } from "react-router-dom";

function MyForm(props) {
  const dispatch = useDispatch();
  const user = props?.location?.state;

  function postUser(user) {
    dispatch(postUserAction(user));
  }

  function updateUser(user, id) {
    dispatch(updateUserAction(user, id));
  }

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      birthDate: user ? user.birthDate : "",
      gender: user ? user.gender : 0,
      salary: user ? user.salary : "",
    },
    onSubmit: (values) => {
      if (user) {
        updateUser(values, user ? user.id : null);
      } else {
        postUser(values);
      }
      history.goBack();
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
      email: Yup.string()
        .max(20, Constants.EMAIL_VALIDATION_MESSAGE_MAX)
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(Constants.EMAIL, Constants.EMAIL_VALIDATION_MESSAGE_REGEX),
      phone: Yup.string()
        .length(11, Constants.PHONE_VALIDATION_MESSAGE_LENGTH)
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(
          Constants.ONLY_DIGIT,
          Constants.PHONE_VALIDATION_MESSAGE_REGEX
        ),
      birthDate: Yup.string()
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(
          Constants.BIRTHDATE,
          Constants.BIRTHDATE_VALIDATION_MESSAGE_REGEX
        ),
      gender: Yup.number().required(Constants.VALIDATION_MESSAGE_REQUIRED),
      salary: Yup.string()
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(
          Constants.ONLY_DIGIT,
          Constants.SALARY_VALIDATION_MESSAGE_REGEX
        ),
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
          label="Email"
          id="email"
          name="email"
          helperText={formik.errors.email}
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
          label="Birthday"
          id="birthDate"
          name="birthDate"
          helperText={formik.errors.birthDate}
          type="date"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <MyInput
          label="Gender"
          id="gender"
          name="gender"
          helperText={formik.errors.gender}
          type="text"
          select
          required
        >
          <MenuItem value="0">Erkek</MenuItem>
          <MenuItem value="1">Kadın</MenuItem>
        </MyInput>
        <MyInput
          label="Salary"
          id="salary"
          name="salary"
          helperText={formik.errors.salary}
          type="select"
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
