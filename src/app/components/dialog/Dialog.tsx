import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MUIDialog,
} from "@mui/material";
import React from "react";
import Button from "../button/Button";
interface DialogProps {
  handleSuccess: (objectId?: number | null) => void;
  handleCancel: () => void;
  title: string;
  content: React.ReactNode;
  open: boolean;
  handleclose: () => void;
  successBtnName: string;
  cancelBtnName: string;
  objectId?: number | null;
}

const Dialog: React.FC<DialogProps> = ({
  handleSuccess,
  handleCancel,
  title,
  content,
  open,
  handleclose,
  successBtnName,
  cancelBtnName,
  objectId,
}) => {
  return (
    <MUIDialog open={open} onClose={handleclose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          children={successBtnName}
          onClick={() => handleSuccess(objectId)}
        />
        <Button children={cancelBtnName} onClick={handleCancel} />
      </DialogActions>
    </MUIDialog>
  );
};

export default Dialog;
