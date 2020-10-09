import React from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup({ isOpen, onClose, handleCloseButton, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }
  return (
    <PopupWithForm name="add" title="Новое место" isOpen={isOpen} buttonTitle="Создать" handleCloseButton={handleCloseButton} onSubmit={handleSubmit}>
      <input type="text" id="title-input" name="name" required placeholder="Название" className="popup__input"
        minLength="1" maxLength="30" ref={nameRef} />
      <span className="popup__error" id="title-input-error"></span>
      <input type="url" id="src-input" name="link" required placeholder="Ссылка на картинку" className="popup__input" ref={linkRef} />
      <span className="popup__error" id="src-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;