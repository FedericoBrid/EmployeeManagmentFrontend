import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EmployeeForm from "./EmployeeForm";
function EditEmployeeDialog({
  open,
  employee,
  onChange,
  onClose,
  onUpdate,
  loading,
  errors,
  onClearError,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      errors={errors}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Employee</DialogTitle>

      <DialogContent>
        {employee && (
          <EmployeeForm
            employee={employee}
            onChange={onChange}
            onClearError={onClearError}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={onUpdate} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default EditEmployeeDialog;
