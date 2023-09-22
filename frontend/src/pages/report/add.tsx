import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/MainLayout';
import * as yup from 'yup';
import { useForm, useFieldArray } from 'react-hook-form';

type FormValues = {
  reports: {
    taskId: string;
    taskTitle: string;
    project: string;
    percentage: number;
    types: string;
    status: string;
    hours: number;
  }[];
};
const ReportAddPage = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      report: [
        {
          taskId: '',
          taskTitle: '',
          project: '',
          percentage: 0,
          types: '',
          status: '',
          hours: 0,
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    name: 'report',
    control,
  });
  return <div></div>;
};

export default ReportAddPage;
ReportAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
