import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/MainLayout';
import type { NextPageWithLayout } from './_app';

const DashboardPage : NextPageWithLayout = () => {
  return <div>I am Dashboard Page</div>;
};

DashboardPage.getLayout = function getLayout(page : ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default DashboardPage;