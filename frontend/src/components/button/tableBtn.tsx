import { Button, styled } from '@mui/material';
import React from 'react';
import palette from '@/theme/palette';

const TableBtn = (props: any) => {
  let colorCode;
  const secondaryColor = palette.secondary.main;
  const errorColor = palette.error.light;

  switch (props.children) {
    case 'Edit':
      colorCode = secondaryColor;
      break;
    case 'Remove':
      colorCode = errorColor;
      break;
    default:
      colorCode = secondaryColor;
      break;
  }

  const TableButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 13,
    padding: '3px 20px',
    border: '1px solid',
    borderRadius: '20px',
    backgroundColor: colorCode,
    color: palette.text.primary,
    borderColor: props.children === 'Edit' ? secondaryColor : errorColor,
    marginRight: '10px',
    '&:hover': {
      backgroundColor: props.children === 'Edit' ? secondaryColor : errorColor,
      borderColor: props.children === 'Edit' ? secondaryColor : errorColor,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: props.children === 'Edit' ? secondaryColor : errorColor,
      borderColor: props.children === 'Edit' ? secondaryColor : errorColor,
    },
  });

  return (
    <TableButton variant="contained" {...props}>
      {props.children}
    </TableButton>
  );
};

export default TableBtn;
