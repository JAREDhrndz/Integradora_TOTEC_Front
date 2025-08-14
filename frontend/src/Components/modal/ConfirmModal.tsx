// frontend/src/Components/modal/ConfirmModal.tsx
import './ConfirmModal.css';

type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title || '¿Estás seguro?'}</h2>
        <p>{message || 'Esta acción no se puede deshacer.'}</p>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onCancel}>Cancelar</button>
          <button className="confirm-button" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;