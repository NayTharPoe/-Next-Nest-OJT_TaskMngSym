import * as yup from "yup";

export const TaskAddSchema = yup.object().shape({
  project: yup.string().required("Project is required"),
  assignedEmployee: yup.string().required("Assign employee is required"),
  description: yup.string(),
  title: yup.string().required("Title is required"),
  estimateHour: yup.number().required("Estimate hour is required"),
  estimate_start_date: yup.date(),
  estimate_finish_date: yup
    .date()
    .test(
      "estimate_finish_date",
      "Estimate finish date cannot be less than start date",
      function (value) {
        const endDate = this.parent.estimate_start_date;
        if (!endDate || !value) {
          return true;
        }
        return value > endDate;
      }
    ),
});

export const TaskEditSchema = yup.object().shape({
  project: yup.string().required("Project is required"),
  assignedEmployee: yup.string().required("Assign employee is required"),
  description: yup.string(),
  title: yup.string().required("Title is required"),
  status: yup.string().required("Status is required"),
  estimateHour: yup.number().required("Estimate hour is required"),
  actualHour: yup.number().required("Actual hour is required"),
  estimate_start_date: yup.date(),
  estimate_finish_date: yup
    .date()
    .test(
      "estimate_finish_date",
      "Estimate finish date cannot be less than start date",
      function (value) {
        const endDate = this.parent.estimate_start_date;
        if (!endDate || !value) {
          return true;
        }
        return value > endDate;
      }
    ),
  actual_start_date: yup.date(),
  actual_finish_date: yup
    .date()
    .test(
      "actual_finish_date",
      "Actual finish date cannot be less than start date",
      function (value) {
        const endDate = this.parent.actual_start_date;
        if (!endDate || !value) {
          return true;
        }
        return value > endDate;
      }
    ),
});
