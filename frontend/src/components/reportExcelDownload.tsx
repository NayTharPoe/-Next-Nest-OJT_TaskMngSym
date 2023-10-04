import React from 'react';
import { Button } from '@mui/material';
import { GetApp as DownloadIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import palette from '@/theme/palette';

interface ExcelDownloadButtonProps {
  data: any[];
  fileName: string;
}

const ExcelDownloadButton: React.FC<ExcelDownloadButtonProps> = ({ data, fileName }) => {
  const handleExcelDownload = () => {
    const workbook = XLSX.utils.book_new();

    const statusOptions = [
      { value: 0, label: 'Open' },
      { value: 1, label: 'In Progress' },
      { value: 2, label: 'Finish' },
      { value: 3, label: 'Close' },
    ];

    const dataWithCorrectHeaders = data.map((item, index) => ({
      ReportID: index + 1,
      Date: dayjs(item.createdAt).format('YYYY/MM/DD'),
      TaskTitle: item.taskTitle,
      Project: item.project,
      Percentage: `${item.percentage} %`,
      Hours: `${item.hours} hours`,
      Types: item.types,
      Status: statusOptions.find((option) => option.value === item.status)?.label,
      ReportedTo: item.reportTo,
      ReportedBy: item.reportBy.employeeName,
      ProblemFeeling: item.problemFeeling == '' ? 'Nothing' : item.problemFeeling,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataWithCorrectHeaders, {
      header: [
        'ReportID',
        'Date',
        'TaskTitle',
        'Project',
        'Types',
        'Status',
        'Percentage',
        'Hours',
        'ReportedTo',
        'ReportedBy',
        'ProblemFeeling',
      ],
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report List');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      sx={{
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 13,
        padding: '10px 20px',
        border: '1px solid',
        borderRadius: '26px',
        backgroundColor: palette.secondary.main,
        color: palette.text.primary,
        borderColor: palette.secondary.border,
        marginRight: '10px',
        '&:hover': {
          backgroundColor: palette.secondary.main,
          borderColor: palette.secondary.border,
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: palette.secondary.main,
          borderColor: palette.secondary.border,
        },
      }}
      startIcon={<DownloadIcon />}
      onClick={handleExcelDownload}
    >
      Download Excel
    </Button>
  );
};

export default ExcelDownloadButton;
