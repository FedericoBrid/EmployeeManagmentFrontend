import { useEffect, useState } from "react";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/EmployeeService";
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

function useEmployee() {
  //Para obtener todos los employees
  const [employees, setEmployees] = useState([]);
  //para obtener un employee
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  //para crear un nuevo employee
  const [newEmployee, setNewEmployee] = useState(emptyEmployee);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //traemos todos los employees
  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadEmployees();
  }, []);

  //Eliminar employee
  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id),
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError(error);
    }
  };

  //Traer employee para editar
  const handleEdit = async (id) => {
    try {
      const employee = await getEmployeeById(id);
      setSelectedEmployee(employee);
      return employee;
    } catch (error) {
      console.error("Error fetching employee:", error);
      setError(error);
      return null;
    }
  };

  //Actualizamos employee
  const handleUpdate = async () => {
    try {
      await updateEmployee(selectedEmployee.id, selectedEmployee);

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === selectedEmployee.id ? selectedEmployee : employee,
        ),
      );
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Error updating employee:", error);
      setError(error);
    }
  };

  //Creamos employee
  const handleCreate = async () => {
    try {
      const createdEmployee = await createEmployee(newEmployee);
      setEmployees((prevEmployees) => [...prevEmployees, createdEmployee]);
      setNewEmployee(emptyEmployee);
    } catch (error) {
      console.error("Error creating employee:", error);
      setError(error);
    }
  };

  //Limpiamos formulario
  const resetNewEmployee = () => {
    setNewEmployee(emptyEmployee);
  };
  return {
    employees,

    selectedEmployee,
    setSelectedEmployee,

    newEmployee,
    setNewEmployee,

    handleDelete,
    handleEdit,
    handleUpdate,
    handleCreate,

    resetNewEmployee,

    loading,
    error,
  };
}

export default useEmployee;
