import { useEffect, useState } from "react";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/EmployeeService";
import { validateEmployee } from "../utils/employeeValidation";
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
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  //Esto es error de API
  const [error, setError] = useState(null);
  //Estos son errores de validaciones
  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

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
      setDeletingId(id);
      await deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id),
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError(error);
    } finally {
      setDeletingId(null);
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
      if (!selectedEmployee) {
        return false;
      }
      const validationErrors = validateEmployee(selectedEmployee);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
      }
      setUpdating(true);
      await updateEmployee(selectedEmployee.id, selectedEmployee);

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === selectedEmployee.id ? selectedEmployee : employee,
        ),
      );
      setSelectedEmployee(null);
      setErrors({});
      return true;
    } catch (error) {
      console.error("Error updating employee:", error);
      setError(error);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  //Creamos employee
  const handleCreate = async () => {
    try {
      const validationErrors = validateEmployee(newEmployee);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return false;
      }
      setCreating(true);
      const createdEmployee = await createEmployee(newEmployee);
      setEmployees((prevEmployees) => [...prevEmployees, createdEmployee]);
      setNewEmployee(emptyEmployee);
      setErrors({});
      return true;
    } catch (error) {
      console.error("Error creating employee:", error);
      setError(error);
    } finally {
      setCreating(false);
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
    creating,
    updating,
    deletingId,

    errors,
    clearError,
  };
}

export default useEmployee;
