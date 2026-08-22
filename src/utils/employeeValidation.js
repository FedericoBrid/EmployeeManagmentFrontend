export const validateEmployee = (employee) => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!employee.email?.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(employee.email)) {
    errors.email = "Invalid email";
  }

  if (!employee.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!employee.surname?.trim()) {
    errors.surname = "Surname is required";
  }

  if (!employee.department?.trim()) {
    errors.department = "Department is required";
  }

  if (!employee.employeeType?.trim()) {
    errors.employeeType = "Employee type is required";
  }

  if (!employee.gender?.trim()) {
    errors.gender = "Gender is required";
  }

  if (!employee.phoneNumber?.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^\d+$/.test(employee.phoneNumber)) {
    errors.phoneNumber = "Phone number must contain only numbers";
  }

  if (!employee.status?.trim()) {
    errors.status = "Status is required";
  }

  return errors;
};
