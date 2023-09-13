import { Button, styled } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';

type AddNewBtnIF = {
  AddNewBtnText: string
  path: string
}

const AddNewBtn = ({ AddNewBtnText, path } : AddNewBtnIF) => {
  const router = useRouter();
  const AddNewBtn = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 13,
    padding: '10px 20px',
    border: '1px solid',
    borderRadius: '26px',
    backgroundColor: '#C9B7EB',
    color: '#222121',
    borderColor: '#C9B7EB',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#bca4e6',
      borderColor: '#bca4e6',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#bca4e6',
      borderColor: '#bca4e6',
    },
  });

  const changePath = () => router.push(path);

  return (
    <AddNewBtn
      variant="contained"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        changePath();
      }}
    >
      <AddIcon fontSize="small" />
      {AddNewBtnText}
    </AddNewBtn>
  );
};

export default AddNewBtn;
