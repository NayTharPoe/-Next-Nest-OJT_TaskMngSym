import { Button, styled } from '@mui/material';
import React from 'react';
import palette from '@/theme/palette';

const TableBtn = ({ tableBtnText } : {tableBtnText: string}) => {
  let colorCode
  const primaryColor = palette.primary.main
  const secondaryColor = palette.secondary.main
  const errorColor = palette.error.main

  switch (tableBtnText) {
    case 'Edit':
      colorCode = secondaryColor
      break;
    case 'Preview':
      colorCode = primaryColor
      break;
    case 'Remove':
      colorCode = errorColor
      break;
    default:
      colorCode = secondaryColor
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
    borderColor: tableBtnText === "Edit" ? secondaryColor : primaryColor,
    marginRight: '10px',
    "&:hover": {
      backgroundColor: tableBtnText === "Edit" ? secondaryColor : primaryColor,
      borderColor: tableBtnText === "Edit" ? secondaryColor : primaryColor,
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: tableBtnText === "Edit" ? secondaryColor : primaryColor,
      borderColor: tableBtnText === "Edit" ? secondaryColor : primaryColor,
    }
  });

  return (
    <TableButton
      variant="contained"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {tableBtnText}
    </TableButton>
  );
};

export default TableBtn;
