import React from 'react';
function ImagePopup({ card, handleCloseButton, onClose }) {
  return (
    <div className={`popup image-popup ${(typeof (card) == "boolean") ? '' : 'popup_opened'}`}>
      <div className="image-popup__container">
        <img src={card.link} alt={`Фото ${card.name}`} className="image-popup__image" />
        <p className="image-popup__name">{card.name}</p>
        <button type="button" aria-label="Закрыть" className="popup__cancel-button" onClick={handleCloseButton}> </button>
      </div>
    </div>
  );
}
export default ImagePopup;