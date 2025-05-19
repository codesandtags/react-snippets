import * as React from "react";

import './styles.css'

export default function ClickOutside() {
  const [isOpen, setIsOpen] = React.useState(false);
  const modalRef = React.useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      const handleEvent = (e: MouseEvent) => {
        const element = modalRef.current;
        if (element && !element.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("pointerdown", handleEvent);

      return () => {
        document.removeEventListener("pointerdown", handleEvent);
      };
    }
  }, [isOpen]);

  return (
    <>
      <section>
        <h1>Click Outside</h1>
        <button className="link" onClick={handleOpenModal}>
          Open Modal
        </button>
      </section>
      {isOpen && (
        <dialog ref={modalRef}>
          <button onClick={handleCloseModal}>❌</button>
          <h2>Modal</h2>
          <p>
            Click outside the modal to close (or use the button) whatever you
            prefer.
          </p>
        </dialog>
      )}
    </>
  );
}