import { Button, styled } from '@mui/material';
import React from 'react';

const TableBtn = ({ tableBtnText } : {tableBtnText: string}) => {
  let colorCode
  switch (tableBtnText) {
    case 'Edit':
      colorCode = '#BDD2BD'
      break;
    case 'Preview': 
      colorCode = '#C9B7EB'
      break;
    case 'Remove': 
      colorCode = '#fc8383'
      break;
    default:
      colorCode = '#BDD2BD'
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
    color: '#222121',
    borderColor: '#BDD2BD',
    marginRight: '10px',
    "&:hover": {
      backgroundColor: tableBtnText === "Edit" ? "#a8c8a8" : "#bca4e6",
      borderColor: tableBtnText === "Edit" ? "#a8c8a8" : "#bca4e6",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: tableBtnText === "Edit" ? "#a8c8a8" : "#bca4e6",
      borderColor: tableBtnText === "Edit" ? "#a8c8a8" : "#bca4e6",
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
