import React, { useEffect, useRef, type FormEvent } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal, { ModalHandle } from "../components/ui/Modal";
import { useSessionContext } from "../store/session";
import { Session } from "../types";

interface BookSessionProps {
  onDone: () => void;
  session: Session;
}

const BookSession = ({ onDone, session }: BookSessionProps) => {
  const modalRef = useRef<ModalHandle>(null);

  const { bookSession } = useSessionContext();

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }, []);

  function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    bookSession(session);

    onDone();
  }

  return (
    <Modal ref={modalRef} onClose={onDone}>
      <h3>Book A Session</h3>
      <form onSubmit={onSubmitForm}>
        <Input id="name" label="ENTER YOUR NAME" type="text" name="name" />
        <Input id="email" label="ENTER YOUR EMAIL" type="email" name="email" />
        <div className="actions">
          <Button>Book Session</Button>
          <Button textOnly onClick={onDone}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BookSession;
