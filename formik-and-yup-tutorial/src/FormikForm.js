// Formik-Yup-Validation-Tutorial.js
import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// This tutorial demonstrates how Formik and Yup work together to streamline form validation in React.
// Formik simplifies form management and validation logic, while Yup provides schema-based validation with a wide range of built-in validation functions. This combo enhances productivity by reducing the amount of boilerplate code.

// Step 1: Define validation schema using Yup
const validationSchema = Yup.object({
  text: Yup.string().required("Text field is required"),
  select: Yup.string().required("Please select an option"),
  checkbox: Yup.boolean().oneOf([true], "Please accept the terms"),
  radio: Yup.string().required("Please select an option"),
  datetime: Yup.date().nullable().required("Date and time are required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const FormikForm = () => {
  // Step 2: Initialize Formik with initial values, validation schema, and submission handler
  const formik = useFormik({
    initialValues: {
      text: "",
      select: "",
      checkbox: false,
      radio: "",
      datetime: null,
      email: "",
      multiSelect: [], // Set multiSelect as an array
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      alert("Form submitted successfully!");
    },
  });

  return (
    <Container>
      <Card>
        <CardHeader title="React Form Validation with Formik & Yup" />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              {/* Text Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Text Field"
                  name="text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.text && Boolean(formik.errors.text)}
                  helperText={formik.touched.text && formik.errors.text}
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              {/* Select Dropdown */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.select && Boolean(formik.errors.select)}
                >
                  <FormLabel>Select Field</FormLabel>
                  <Select
                    name="select"
                    value={formik.values.select}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                  </Select>
                  {formik.touched.select && (
                    <FormHelperText>{formik.errors.select}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Multi-select (if needed) */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Multi Select</FormLabel>
                  <Select
                    name="multiSelect"
                    multiple
                    value={formik.values.multiSelect}
                    onChange={formik.handleChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkbox"
                      checked={formik.values.checkbox}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  }
                  label="Accept Terms and Conditions"
                />
                {formik.touched.checkbox && formik.errors.checkbox && (
                  <FormHelperText error>
                    {formik.errors.checkbox}
                  </FormHelperText>
                )}
              </Grid>

              {/* Radio Group */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  component="fieldset"
                  error={formik.touched.radio && Boolean(formik.errors.radio)}
                >
                  <FormLabel component="legend">Radio Group</FormLabel>
                  <RadioGroup
                    name="radio"
                    value={formik.values.radio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <FormControlLabel
                      value="option1"
                      control={<Radio />}
                      label="Option 1"
                    />
                    <FormControlLabel
                      value="option2"
                      control={<Radio />}
                      label="Option 2"
                    />
                  </RadioGroup>
                  {formik.touched.radio && formik.errors.radio && (
                    <FormHelperText>{formik.errors.radio}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Date and Time Picker */}
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Select Date and Time"
                    value={formik.values.datetime}
                    onChange={(value) =>
                      formik.setFieldValue("datetime", value)
                    }
                    onBlur={formik.handleBlur}
                    renderInput={(params) => <TextField {...params} />}
                    error={
                      formik.touched.datetime && Boolean(formik.errors.datetime)
                    }
                    helperText={
                      formik.touched.datetime && formik.errors.datetime
                    }
                  />
                </LocalizationProvider>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit Form
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FormikForm;
