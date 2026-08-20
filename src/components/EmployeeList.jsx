import { Button } from "@mui/material";
import EmployeeTable from "./EmployeeTable";
import CreateEmployeeDialog from "./CreateEmployeeDialog";
import EditEmployeeDialog from "./EditEmployeeDialog";
import { useState } from "react";
import useEmployee from "../hooks/useEmployee";

function EmployeeList() {
  //Estos estados se quedan dentro del componente, porque manejan lógica de UI.
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const {
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
  } = useEmployee();

  const handleOpenEdit = async (id) => {
    const employee = await handleEdit(id);

    if (employee) {
      setOpenEdit(true);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={() => {
          resetNewEmployee();
          setOpenCreate(true);
        }}
        sx={{ marginBottom: 2 }}
      >
        Create
      </Button>
      <EmployeeTable
        employees={employees}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        loading={loading}
      />
      <EditEmployeeDialog
        open={openEdit}
        employee={selectedEmployee}
        onClose={() => {
          setOpenEdit(false);
          setSelectedEmployee(null);
        }}
        onChange={setSelectedEmployee}
        onUpdate={async () => {
          await handleUpdate();
          setOpenEdit(false);
        }}
      />
      <CreateEmployeeDialog
        open={openCreate}
        employee={newEmployee}
        onChange={setNewEmployee}
        onClose={() => setOpenCreate(false)}
        onCreate={async () => {
          await handleCreate();
          setOpenCreate(false);
        }}
      />
    </>
  );
}

export default EmployeeList;
