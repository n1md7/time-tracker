import {Button, Modal, ModalProps} from "react-bootstrap";
import React from "react";
import {useSelector} from "react-redux";
import {RootReducer} from "../redux/reducers";

export default function ModalConfirm(props: ModalProps) {
  const modal = useSelector((store: RootReducer) => store.modal);

  return (
    <Modal
      show={modal.show}
      onHide={modal.closeHandler}
      backdrop="static"
      keyboard={false}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modal.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modal.body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modal.closeHandler}>
          Close
        </Button>
        <Button
          disabled={modal.confirmDisabled}
          onClick={modal.confirmHandler}
          variant={modal.confirmButtonVariant}>{modal.confirmText}</Button>
      </Modal.Footer>
    </Modal>
  );
}
