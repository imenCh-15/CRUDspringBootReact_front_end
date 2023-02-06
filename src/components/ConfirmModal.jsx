import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ConfirmModal(props) {
  const { text, onClose, handleSubmit, open } = props;
  useEffect(() => {
    if (open)
      confirmAlert({
        title: text,
        message: "Are you sure to do this?",
        buttons: [
          {
            label: "Yes",
            onClick: () => handleSubmit()
          },
          {
            label: "No",
            onClick: () => onClose()
          }
        ]
      });
  }, [open]);
}
