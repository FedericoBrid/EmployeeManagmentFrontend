import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EmployeeForm from "./EmployeeForm";
function CreateEmployeeDialog({ open, employee, onChange, onClose, onCreate }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Employee</DialogTitle>

      <DialogContent>
        <EmployeeForm employee={employee} onChange={onChange} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" color="success" onClick={onCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default CreateEmployeeDialog;
