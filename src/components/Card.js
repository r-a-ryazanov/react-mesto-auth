import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
function Card({ card, handleCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card-grid__like ${isLiked ? 'card-grid__like_active' : ''}`
  );
  const cardDeleteButtonClassName = (
    `card-grid__delete-button ${isOwn ? '' : 'card-grid__delete-button_disable'}`
  );
  function handleImageClick() {
    handleCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick(){
    onCardDelete(card);
  }
  return (
    <div className="card-grid__item">
      <img src={card.link} alt="Фото места" className="card-grid__image" onClick={handleImageClick} />
      <div className="card-grid__label">
        <h3 className="card-grid__place">{card.name}</h3>
        <div>
          <button type="button" aria-label="Нравится" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card-grid__like-count">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" aria-label="Удалить" className={cardDeleteButtonClassName} onClick ={handleDeleteClick}></button>
    </div>
  );
}
export default Card;