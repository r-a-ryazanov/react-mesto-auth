import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
function EditProfilePopup({ isOpen, onClose, handleCloseButton, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  function handleChangeName (e) {
    setName(e.target.value);
  }
  function handleChangeAbout (e) {
    setDescription(e.target.value);
  }
  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen} buttonTitle="Сохранить" handleCloseButton={handleCloseButton} onSubmit = {handleSubmit}>
      <input type="text" id="name-input" name="name" required placeholder="Имя путешественника"
        className="popup__input" pattern="[A-Za-zА-Яа-яЁё\s-]+" minLength="2" maxLength="40"  value = {name} onChange = {handleChangeName}/>
      <span className="popup__error" id="name-input-error"></span>
      <input type="text" id="vocation-input" name="about" required
        placeholder="Род деятельности путешественника" className="popup__input" pattern="[A-Za-zА-Яа-яЁё\s-]+"
        minLength="2" maxLength="200"  value = {description} onChange = {handleChangeAbout}/>
      <span className="popup__error" id="vocation-input-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;