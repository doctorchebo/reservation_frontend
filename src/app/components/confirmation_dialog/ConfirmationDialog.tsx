import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Button from "../button/Button";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  content: string;
  successText: string;
  cancelText: string;
  onSuccess: () => void;
  onCancel: () => void;
}
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  content,
  successText,
  cancelText,
  onSuccess,
  onCancel,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button children={successText} onClick={onSuccess} />
        <Button children={cancelText} onClick={onCancel} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
