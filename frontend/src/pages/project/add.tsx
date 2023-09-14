import React from 'react'
import MainLayout from '@/layouts/MainLayout'
import { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';

const AddNewProjectPage: NextPageWithLayout = () => {
  return (
    <div>
      hey add your new project
    </div>
  )
}

AddNewProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
export default AddNewProjectPage
