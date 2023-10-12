import * as yup from "yup";

export const TaskAddSchema = yup.object().shape({
  project: yup.string().required("Project is required"),
  assignedEmployee: yup.string().required("Assign employee is required"),
  description: yup.string(),
  title: yup.string().required("Title is required"),
  estimateHour: yup
    .number()
    .typeError("Estimate hour must be a number")
    .min(1, "Hour must be greater than 0")
    .required("Estimate hour is required"),
  estimate_start_date: yup
    .date()
    .typeError("Invalid date format")
    .required("Estimate start date is required"),
  estimate_finish_date: yup
    .date()
    .typeError("Invalid date format")
    .test(
      "estimate_finish_date",
      "Estimate finish date cannot be less than start date",
      function (value) {
        const endDate = this.parent.estimate_start_date;
        if (!endDate || !value) {
          return true;
        }
        return value >= endDate;
      }
    )
    .required("Estimate finish date is required"),
});

export const TaskEditSchema = yup.object().shape({
  project: yup.string().required("Project is required"),
  assignedEmployee: yup.string().required("Assign employee is required"),
  description: yup.string(),
  title: yup.string().required("Title is required"),
  status: yup.string().required("Status is required"),
  estimateHour: yup
    .number()
    .typeError("Estimate hour must be a number")
    .min(1, "Hour must be greater than 0")
    .required("Estimate hour is required"),
  actualHour: yup
    .number()
    .typeError("Actual hour must be a number")
    .min(1, "Hour must be greater than 0")
    .required("Actual hour is required"),
  estimate_start_date: yup.date().typeError("Invalid date format"),
  estimate_finish_date: yup
    .date()
    .typeError("Invalid date format")
    .test(
      "estimate_finish_date",
      "Estimate finish date cannot be less than start date",
      function (value) {
        const endDate = this.parent.estimate_start_date;
        if (!endDate || !value) {
          return true;
        }
        return value >= endDate;
      }
    ),
  actual_start_date: yup
    .date()
    .typeError("Invalid date format")
    .required("Actual start date is required"),
  actual_finish_date: yup
    .date()
    .typeError("Invalid date format")
    .test(
      "actual_finish_date",
      "Actual finish date cannot be less than start date",
      function (value) {
        const endDate = this.parent.actual_start_date;
        if (!endDate || !value) {
          return true;
        }
        return value >= endDate;
      }
    )
    .required("Actual finish date is required"),
});
