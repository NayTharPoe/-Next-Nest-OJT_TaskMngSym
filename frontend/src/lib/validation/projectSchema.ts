import * as yup from 'yup';

export const ProjectSchema = yup.object().shape({
  projectName: yup.string().required('Project Name is required'),
  language: yup.string().required('Language is required'),
  description: yup.string(),
  startDate: yup
    .date()
    .required('Start Date is required')
    .test('startDate', 'Start Date must be before End Date', function (value) {
      const endDate = this.parent.endDate;
      if (!endDate || !value) {
        return true;
      }
      return value < endDate;
    }),
  endDate: yup
    .date()
    .required('End Date is required')
    .test('endDate', 'End Date must be after Start Date', function (value) {
      const startDate = this.parent.startDate;
      if (!startDate || !value) {
        return true;
      }
      return value > startDate;
    }),
});
