import React from 'react';
import PopupWithForm from './PopupWithForm';
function EditAvatarPopup({ isOpen, onClose, handleCloseButton, onUpdateAvatar }) {
  const linkRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: linkRef.current.value,
    });
  }
  return (
    <PopupWithForm name="update" title="Обновить аватар" isOpen={isOpen} buttonTitle="Сохранить" handleCloseButton={handleCloseButton} onSubmit={handleSubmit}>
      <input type="url" id="link-input" name="link" required placeholder="Ссылка на аватар" className="popup__input" ref={linkRef} />
      <span className="popup__error" id="link-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;