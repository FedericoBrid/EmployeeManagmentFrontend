import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function EmployeeTable({ employees, onEdit, onDelete, deletingId }) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 140 },
    { field: "surname", headerName: "Surname", width: 140 },
    { field: "email", headerName: "Email", width: 140 },
    { field: "department", headerName: "Department", width: 140 },
    { field: "employeeType", headerName: "Employee Type", width: 140 },
    { field: "gender", headerName: "Gender", width: 140 },
    { field: "phoneNumber", headerName: "Phone Number", width: 140 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => {
        const isDeleting = deletingId === params.row.id;
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onEdit(params.row.id)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => onDelete(params.row.id)}
              disabled={deletingId === params.row.id}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={employees} columns={columns} />
    </div>
  );
}

export default EmployeeTable;
