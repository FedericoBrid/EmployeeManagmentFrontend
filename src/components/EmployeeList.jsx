import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EmployeeForm from "./EmployeeForm";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

function EmployeeList() {
  //Para obtener todos los employees
  const [employees, setEmployees] = useState([]);
  //para obtener un employee
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  //para abrir el formulario Dialog de MUI para el caso de editar
  const [openEdit, setOpenEdit] = useState(false);
  //para abrir el formulario Dialog de MUI para el caso de crear
  const [openCreate, setOpenCreate] = useState(false);
  //employee vacio
  const emptyEmployee = {
    name: "",
    surname: "",
    email: "",
    department: "",
    employeeType: "",
    gender: "",
    phoneNumber: "",
    status: "",
  };
  //para crear un nuevo employee
  const [newEmployee, setNewEmployee] = useState(emptyEmployee);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id),
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const employee = await getEmployeeById(id);
      setSelectedEmployee(employee);
      setOpenEdit(true);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateEmployee(selectedEmployee.id, selectedEmployee);

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === selectedEmployee.id ? selectedEmployee : employee,
        ),
      );
      setSelectedEmployee(null);
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const createdEmployee = await createEmployee(newEmployee);
      setEmployees((prevEmployees) => [...prevEmployees, createdEmployee]);
      setOpenCreate(false);
      setNewEmployee(emptyEmployee);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const handleOpenCreate = () => {
    setNewEmployee(emptyEmployee);
    setOpenCreate(true);
  };

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
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleEdit(params.row.id)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={handleOpenCreate}
        sx={{ marginBottom: 2 }}
      >
        Create
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={employees} columns={columns} />
      </div>
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Employee</DialogTitle>

        <DialogContent>
          {selectedEmployee && (
            <EmployeeForm
              employee={selectedEmployee}
              onChange={setSelectedEmployee}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Employee</DialogTitle>

        <DialogContent>
          <EmployeeForm employee={newEmployee} onChange={setNewEmployee} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>

          <Button variant="contained" color="success" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeList;
