import * as yup from 'yup';

export const ReportSchema = yup.object().shape({
  reportTo: yup.string().required('Please select an admin.'),
  problem_feeling: yup.string(),
  reports: yup.array().of(
    yup.object().shape({
      taskId: yup.string().required('Task ID is required.'),
      taskTitle: yup.string().required('Task title is required.'),
      project: yup.string().required('Project is required.'),
      percentage: yup
        .number()
        .typeError('Percentage must be a number')
        .min(1, 'percentage must be greater than 0')
        .max(100, 'percentage must be less than or equal to 100')
        .required('Percentage is required.'),
      types: yup.string().required('Types is required.'),
      status: yup.string().required('Status is required.'),
      hours: yup
        .number()
        .typeError('Hours must be a number')
        .min(0, 'hours must be greater than or equal to 0')
        .max(8, 'hours must be less than or equal to 8')
        .required('Hours is required'),
    })
  ),
});
