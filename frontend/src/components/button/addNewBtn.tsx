import { Button, styled } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation'
import palette from '@/theme/palette';

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
    backgroundColor: palette.primary.main,
    color: palette.text.primary,
    borderColor:palette.primary.border,
    marginRight: '10px',
    '&:hover': {
      backgroundColor: palette.primary.main,
      borderColor: palette.primary.border,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: palette.primary.main,
      borderColor: palette.primary.border
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
      <AddIcon fontSize="small" sx={{mr: 1}}/>
      {AddNewBtnText}
    </AddNewBtn>
  );
};

export default AddNewBtn;
