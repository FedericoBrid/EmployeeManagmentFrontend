export const validateEmployee = (employee) => {
  const errors = {};

  if (!employee.name.trim()) {
    errors.name = "Name is required";
  }
  if (!employee.surname.trim()) {
    errors.name = "Surname is required";
  }
  if (!employee.email.trim()) {
    errors.email = "Email is required";
  }

  if (!employee.department.trim()) {
    errors.department = "Department is required";
  }

  if (!employee.employeeType.trim()) {
    errors.employeeType = "Employee type is required";
  }

  if (!employee.gender.trim()) {
    errors.gender = "Gender is required";
  }

  if (!employee.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  }

  if (!employee.status.trim()) {
    errors.status = "Status is required";
  }

  return errors;
};
