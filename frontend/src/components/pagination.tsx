import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginationComponent = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: any) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event: any, value: any) => {
    onPageChange(value);
  };

  return (
    <Pagination
      color="primary"
      sx={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      shape="rounded"
    />
  );
};

export default PaginationComponent;
