import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import palette from "@/theme/palette";

const TaskDownload = ({ datas }: any) => {
  const downloadFile = () => {
    const downloadData = datas?.map((data: any, index: any) => ({
      "Task ID": index + 1,
      Title: data.title,
      Description: data.description,
      "Project Name": data.project,
      "Assigned Employee": data.assignedEmployee,
      "Estimate Hour": data.estimateHour,
      "Actual Hour": data.actualHour,
      // Status: getStatusLabel(data.status),
      Status: data.status,
      "Estimate Start Date": data.estimate_start_date,
      "Estimate Finish Date": data.estimate_finish_date,
      "Actual Start Date": data.actual_start_date,
      "Actual Finish Date": data.actual_finish_date,
    }));

    // Create a new workbook and set the worksheet data
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(downloadData);
    utils.book_append_sheet(workbook, worksheet, "sheet 1");

    // Generate the Excel file
    const buffer = write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "Task List" + ".xlsx");
  };

  return (
    <>
      <Button
        onClick={downloadFile}
        variant="outlined"
        sx={{
          padding: "10px 15px",
          borderRadius: "25px",
          boxShadow: "none",
          background: palette.primary.main,
          color: palette.text.primary,
          "&:hover": {
            background: palette.primary.main,
            borderColor: palette.primary.border,
            boxShadow: "none",
          },
        }}
      >
        <DownloadIcon /> Download
      </Button>
    </>
  );
};

export default TaskDownload;
