import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={props.onFail}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Silmek istediğinize emin misiniz?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={props.onSuccess} color="secondary">
            Sil
          </Button>
          <Button onClick={props.onFail} color="primary" autoFocus>
            İptal
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
