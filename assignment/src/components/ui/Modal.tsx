import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export type ModalHandle = {
  open: () => void;
};

const Modal = forwardRef<
  ModalHandle,
  { children: React.ReactNode; onClose: () => void }
>(({ children, onClose }, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          dialog.current?.showModal();
        },
      };
    },
    []
  );

  const component = (
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>
  );

  return createPortal(component, document.getElementById("modal-root")!);
});

export default Modal;
