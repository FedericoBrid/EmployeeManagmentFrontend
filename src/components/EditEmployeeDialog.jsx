import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EmployeeForm from "./EmployeeForm";
function EditEmployeeDialog(onOpen, employee, onClose, onChange, onUpdate) {
  <Dialog open={onOpen} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Edit Employee</DialogTitle>

    <DialogContent>
      {employee && <EmployeeForm employee={employee} onChange={onChange} />}
    </DialogContent>

    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>

      <Button variant="contained" onClick={onUpdate}>
        Save
      </Button>
    </DialogActions>
  </Dialog>;
}
export default EditEmployeeDialog;
