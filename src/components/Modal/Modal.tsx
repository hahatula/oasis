import './Modal.css';
import { useEffect } from 'react';

type ModalProps = {
  name: string;
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ name, onClose, children }) => {
  useEffect(() => {
    // define the handle functions inside useEffect (not to lose the reference on rerendering) and attach listeners to the doc
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    // remove the listener in the `clean-up` function
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [onClose]);

  const handleOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
      <div className="modal__container">
        <button className="modal__close-btn" type="button" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};
