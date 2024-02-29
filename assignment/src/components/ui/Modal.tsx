import React, { useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const component = (
    <dialog className="modal" open ref={dialog}>
      {children}
    </dialog>
  );

  return createPortal(component, document.getElementById("modal-root")!);
};

export default Modal;
