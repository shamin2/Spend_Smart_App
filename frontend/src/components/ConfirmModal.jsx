import React from 'react';

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
    >
      <div
        className="confirm-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`confirm-modal__icon ${
            danger
              ? 'confirm-modal__icon--danger'
              : ''
          }`}
        >
          {danger ? '!' : '?'}
        </div>

        <div className="confirm-modal__content">
          <h2>{title}</h2>
          <p>{message}</p>
        </div>

        <div className="confirm-modal__actions">
          <button
            className="confirm-modal__cancel"
            type="button"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className={
              danger
                ? 'confirm-modal__confirm confirm-modal__confirm--danger'
                : 'confirm-modal__confirm'
            }
            type="button"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};