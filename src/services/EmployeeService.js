const API_URL = "http://localhost:8080/api/employees";

export const getEmployees = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los empleados");
  }

  return response.json();
};

export const getEmployeeById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener el empleado");
  }

  return response.json();
};

export const createEmployee = async (employee) => {
  const response = await fetch(`${API_URL}/addEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el empleado");
  }

  return response.json();
};

export const updateEmployee = async (id, employee) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el empleado");
  }

  return response.json();
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el empleado");
  }
};
