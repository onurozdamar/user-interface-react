import { Button } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import MyInput from "./MyInput";

function MyForm(props) {
  const { user } = props;

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : "",
      surname: user ? user.surname : "",
      phone: user ? user.phone : "",
    },
    onSubmit: (values) => {
      console.log(values);
      props.click({
        name: values.name,
        surname: values.surname,
        phone: values.phone,
      });
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
      phone: Yup.string()
        .min(8, "Phone must be at least 8 characters")
        .max(20, "Phone must be less then 20 characters")
        .required("Phone is required")
        .matches(/^\d+$/, "Phone can contain only numbers"),
    }),
  });

  return (
    <FormikProvider value={formik}>
      <Form style={{ display: "flex", flexDirection: "column" }}>
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
          label="Phone"
          id="phone"
          name="phone"
          helperText={formik.errors.phone}
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