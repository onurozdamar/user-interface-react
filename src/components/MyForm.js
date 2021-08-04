import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
} from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  postEmployee as postEmployeeAction,
  updateEmployee as updateEmployeeAction,
} from "../store/actions";
import MyInput from "./MyInput";
import * as Constants from "../Constants";
import { useHistory } from "react-router-dom";
import moment from "moment";
import MyPhoneInput from "./MyPhoneInput";
import {
  ArrowBack,
  AssignmentInd,
  AttachMoney,
  Cake,
  Email,
  Phone,
  Wc,
} from "@material-ui/icons";

function MyForm(props) {
  const dispatch = useDispatch();
  const employee = props?.location?.state;

  function postEmployee(employee) {
    dispatch(postEmployeeAction(employee));
  }

  function updateEmployee(employee) {
    dispatch(updateEmployeeAction(employee));
  }

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: employee ? employee.name : "",
      email: employee ? employee.email : "",
      phone: employee ? employee.phone : "+90",
      birthDate: employee
        ? moment(employee.birthDate).format("yyyy-MM-DD")
        : "",
      gender: employee ? employee.gender : 0,
      salary: employee ? employee.salary : "",
    },
    onSubmit: (values) => {
      if (employee) {
        updateEmployee({ ...values, id: employee.id });
      } else {
        postEmployee(values);
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
        .length(13, Constants.PHONE_VALIDATION_MESSAGE_LENGTH)
        .required(Constants.VALIDATION_MESSAGE_REQUIRED)
        .matches(
          Constants.ONLY_DIGIT,
          Constants.PHONE_VALIDATION_MESSAGE_REGEX
        ),
      birthDate: Yup.date()
        .max(new Date(), Constants.BIRTHDATE_VALIDATION_MESSAGE_MAX)
        .required(Constants.VALIDATION_MESSAGE_REQUIRED),
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
        onClick={() => history.goBack()}
      >
        <ArrowBack />
      </IconButton>
      <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          style={{ display: "flex", flexDirection: "column", margin: 20 }}
        >
          <MyInput
            label="Name"
            id="name"
            name="name"
            helperText={formik.errors.name}
            type="text"
            required
            icon={<AssignmentInd />}
          />
          <MyInput
            label="Email"
            id="email"
            name="email"
            helperText={formik.errors.email}
            type="text"
            required
            icon={<Email />}
          />
          <MyPhoneInput
            label="Phone"
            id="phone"
            name="phone"
            helperText={formik.errors.phone}
            type="text"
            required
            icon={<Phone />}
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
            icon={<Cake />}
          />
          <MyInput
            label="Gender"
            id="gender"
            name="gender"
            helperText={formik.errors.gender}
            type="text"
            select
            required
            icon={<Wc />}
          >
            <MenuItem value={0}>Erkek</MenuItem>
            <MenuItem value={1}>Kadın</MenuItem>
          </MyInput>
          <MyInput
            label="Salary"
            id="salary"
            name="salary"
            helperText={formik.errors.salary}
            type="select"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            required
            icon={<AttachMoney />}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formik.isValid || !formik.dirty}
          >
            {employee ? "Update" : "Save"}
          </Button>
        </Form>
      </FormikProvider>
    </Paper>
  );
}

export default MyForm;
