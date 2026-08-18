import { TextField } from "@mui/material";

function EmployeeForm({ employee, onChange }) {
  const handleChange = (field) => (event) => {
    onChange({
      ...employee,
      [field]: event.target.value,
    });
  };

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        value={employee.name}
        onChange={handleChange("name")}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Surname"
        value={employee.surname}
        onChange={handleChange("surname")}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        value={employee.email}
        onChange={handleChange("email")}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Department"
        value={employee.department}
        onChange={handleChange("department")}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Employee Type"
        value={employee.employeeType}
        onChange={handleChange("employeeType")}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Gender"
        value={employee.gender}
        onChange={handleChange("gender")}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Phone Number"
        value={employee.phoneNumber}
        onChange={handleChange("phoneNumber")}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Status"
        value={employee.status}
        onChange={handleChange("status")}
      />
    </>
  );
}

export default EmployeeForm;
