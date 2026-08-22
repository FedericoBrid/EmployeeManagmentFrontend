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

function EmployeeForm({ employee, onChange, errors = {}, onClearError }) {
  const handleChange = (field) => (event) => {
    onChange({
      ...employee,
      [field]: event.target.value,
    });
    onClearError(field);
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
          error={!!errors[field.name]}
          helperText={errors[field.name] || ""}
        />
      ))}
    </>
  );
}

export default EmployeeForm;
