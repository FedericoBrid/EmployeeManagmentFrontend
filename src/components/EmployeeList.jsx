import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function EmployeeList() {
  //Para obtener todos los employees
  const [employees, setEmployees] = useState([]);
  //para obtener un employee
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  //para abrir el formulario Dialog de MUI para el caso de editar
  const [openEdit, setOpenEdit] = useState(false);
  //para abrir el formulario Dialog de MUI para el caso de crear
  const [openCreate, setOpenCreate] = useState(false);
  //para crear un nuevo employee
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    surname: "",
    email: "",
    department: "",
    employeeType: "",
    gender: "",
    phoneNumber: "",
    status: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/employees/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id),
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleEdit = (id) => {
    fetch(`http://localhost:8080/api/employees/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener el empleado");
        }
        return response.json();
      })
      .then((employee) => {
        setSelectedEmployee(employee);
        setOpenEdit(true);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
      });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8080/api/employees/${selectedEmployee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedEmployee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo actualizar el empleado");
        }
        return response.json();
      })
      .then((updatedEmployee) => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee,
          ),
        );
        setOpenEdit(false);
        setSelectedEmployee(null);
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  const handleCreate = () => {
    fetch(`http://localhost:8080/api/employees/addEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo crear el empleado");
        }
        return response.json();
      })
      .then((createdEmployee) => {
        setEmployees((prevEmployee) => [...prevEmployee, createdEmployee]);
        setOpenCreate(false);
        setNewEmployee({
          name: "",
          surname: "",
          email: "",
          department: "",
          employeeType: "",
          gender: "",
          phoneNumber: "",
          status: "",
        });
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
      });
  };

  const handleOpenCreate = () => {
    setNewEmployee({
      name: "",
      email: "",
      department: "",
      employeeType: "",
      gender: "",
      phoneNumber: "",
    });

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
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                value={selectedEmployee.name}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    name: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={selectedEmployee.email}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    email: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                margin="normal"
                label="Department"
                value={selectedEmployee.department}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    department: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                margin="normal"
                label="Employeed Type"
                value={selectedEmployee.employeeType}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    employeeType: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                margin="normal"
                label="Gender"
                value={selectedEmployee.gender}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    gender: e.target.value,
                  })
                }
              />

              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                value={selectedEmployee.phoneNumber}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </>
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
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                name: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                email: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Department"
            value={newEmployee.department}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                department: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Employee Type"
            value={newEmployee.employeeType}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                employeeType: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Gender"
            value={newEmployee.gender}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                gender: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            value={newEmployee.phoneNumber}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                phoneNumber: e.target.value,
              })
            }
          />

          <TextField
            label="Surname"
            value={newEmployee.surname}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                surname: e.target.value,
              })
            }
          />

          <TextField
            label="Status"
            value={newEmployee.status}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                status: e.target.value,
              })
            }
          />
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
