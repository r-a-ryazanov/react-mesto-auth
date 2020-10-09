import React, { Children } from 'react';
function PopupWithForm({ name, title, isOpen, onClose, children, buttonTitle, handleCloseButton, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form id={`${name}-form`} name={`${name}-form`} method="GET" action="#" className="popup__container" noValidate onSubmit={onSubmit}>
        <p className="popup__title">{title}</p>
        {children}
        <button type="button" aria-label="Закрыть" className="popup__cancel-button" onClick={handleCloseButton}> </button>
        <button type="submit" className="popup__apply-button">{buttonTitle}</button>
      </form>
    </div>
  );
}
export default PopupWithForm;
