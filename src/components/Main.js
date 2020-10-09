import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
function Main({ onEditAvatar, onEditProfile, onAddPlace, handleCardClick, cards, onCardLike, onCardDelete, handleExitButton, email }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <Header name = "Выйти" handleExitButton = {handleExitButton} email={email}/>
      <section className="profile">
        <div className="profile__avatar-place" onClick={onEditAvatar}>
          <img src={currentUser && currentUser.avatar} alt="Аватар" className="profile__avatar" />
          <div className="profile__pen"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser && currentUser.name}</h1>
          <button type="button" aria-label="Изменить" className="profile__edit-button" onClick={onEditProfile}></button>
          <p className="profile__vocation">{currentUser && currentUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="card-grid">
        {cards && cards.map((item) => (
          <Card card={item} key={item._id} handleCardClick={handleCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}
export default Main;
