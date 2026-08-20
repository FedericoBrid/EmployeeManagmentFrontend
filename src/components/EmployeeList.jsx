import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/EmployeeService";
import EmployeeTable from "./EmployeeTable";
import CreateEmployeeDialog from "./CreateEmployeeDialog";
import EditEmployeeDialog from "./EditEmployeeDialog";

function EmployeeList() {
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
  //Para obtener todos los employees
  const [employees, setEmployees] = useState([]);
  //para obtener un employee
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  //para abrir el formulario Dialog de MUI para el caso de editar
  const [openEdit, setOpenEdit] = useState(false);
  //para abrir el formulario Dialog de MUI para el caso de crear
  const [openCreate, setOpenCreate] = useState(false);
  //para crear un nuevo employee
  const [newEmployee, setNewEmployee] = useState(emptyEmployee);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  useEffect(() => {
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
      <EmployeeTable
        employee={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditEmployeeDialog
        onOpen={openEdit}
        employee={selectedEmployee}
        onClose={() => setOpenCreate(false)}
        onChange={setSelectedEmployee}
        onUpdate={handleUpdate}
      />
      <CreateEmployeeDialog
        open={openCreate}
        employee={newEmployee}
        onChange={setNewEmployee}
        onClose={() => setOpenCreate(false)}
        onCreate={handleCreate}
      />
    </>
  );
}

export default EmployeeList;
