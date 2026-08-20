import { TextField } from "@mui/material";

const fields = [
  { name: "name", label: "Name" },
  { name: "surname", label: "Surname" },
  { name: "email", label: "Email" },
  { name: "department", label: "Department" },
  { name: "employeeType", label: "Employee Type" },
  { name: "gender", label: "Gender" },
  { name: "phoneNumber", label: "Phone Number" },
  { name: "status", label: "Status" },
];

function EmployeeForm({ employee, onChange }) {
  const handleChange = (field) => (event) => {
    onChange({
      ...employee,
      [field]: event.target.value,
    });
  };

  return (
    <>
      {fields.map((field) => (
        <TextField
          key={field.name}
          fullWidth
          margin="normal"
          label={field.label}
          value={employee[field.name] || ""}
          onChange={handleChange(field.name)}
        />
      ))}
    </>
  );
}

export default EmployeeForm;
