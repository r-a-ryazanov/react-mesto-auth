import React from 'react';
import '../App.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './/AddPlacePopup';
import { Route, Switch, Redirect, useHistory  } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState();
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setloggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory(); 
  React.useEffect(() => {
    if (localStorage.getItem('token') != null) {
      api.verifyToken(localStorage.getItem('token'))
      .then((result)=>{      
        if(result){
          setCurrentUser({name: result.data.name, about:result.data.about, avatar: result.data.avatar});
          setEmail(result.data.email);
          api.getInitialCards(localStorage.getItem('token'))
          .then((result) => {
            setCards(result)
          });
          setloggedIn(true);
          history.push('/main');
        }else{
          localStorage.removeItem('token');
        }
      })
    }
    
  }, []);
  //---------Обработчик клика кнопку лайка карточки----------------
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, localStorage.getItem('token'))
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }
  //---------Обработчик клика кнопку удаления карточки----------------
  function handleCardDelete(card) {
    api.deleteCard(card._id, localStorage.getItem('token'))
    .then((result) =>  setCards(cards.filter((item) => { return item._id != card._id })));
  
  }
  //---------Обработчик клика кнопку изменения аватара----------------
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  //---------Обработчик клика кнопку изменения профиля----------------
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  //---------Обработчик клика кнопку добавления карточки----------------
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  //---------Функция, закрывающая всплывающие окна----------------
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipOpen(false);
  }
  //---------Обработчик клика на карточку----------------
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //---------Обработчик клика кнопку сохранить всплывающего окна изменения профиля----------------
  function handleUpdateUser(input) {
    api.updateUserInfo(input, localStorage.getItem('token'))
      .then((result) => {
        if(result){
          setCurrentUser(result);
          closeAllPopups();
        }
      });
  }
  //---------Обработчик клика кнопку сохранить всплывающего окна изменения аватара----------------
  function handleUpdateAvatar(input) {
    api.updateUserAvatar(input.avatar, localStorage.getItem('token'))
      .then((result) => {
        if(result){
          setCurrentUser(result);
          closeAllPopups();
        }
      });
  }
  //---------Обработчик клика кнопку создать всплывающего окна добавления карточки----------------
  function handleAddPlaceSubmit(input) {
    api.addCard(input, localStorage.getItem('token'))
      .then((result) => {
        if(result){
        setCards([...cards, result]);
        closeAllPopups();
        }
      });
  }
//---------Обработчик клика кнопку зарегистрироваться----------------
  function handleRegisterUser(registerData)
  {
    
    api.registerUser(registerData, ()=>{setIsInfoTooltipOpen(true)})
    .then((result) => {
      if(result) {
        setloggedIn(true);
        setIsInfoTooltipOpen(true);   
        history.push('/sign-in');     
      }
      
    });
    
  }
  //---------Обработчик клика кнопку войти----------------
  function handleLoginUser(loginData){
    api.loginUser(loginData, ()=>{setIsInfoTooltipOpen(true)})
        .then((result) =>{
          if(result) {
            api.getInitialCards(result.token)
          .then((result) => {
            setCards(result)
          });
            setCurrentUser({name: result.data.name, about:result.data.about, avatar: result.data.avatar});
            setloggedIn(true);
            setEmail(loginData.email);  
            localStorage.setItem('token', result.token); 
            history.push('/main');     
          }
        });       
        
  }
  //---------Обработчик клика кнопку выйти----------------
  function handleExit(){
    setloggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
    history.push('/sign-in');
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
            <ProtectedRoute path="/main" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} handleCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} handleExitButton = {handleExit} email = {email}/>
        <Route path="/sign-up">
          <Register onRegisterUser={handleRegisterUser} />
        </Route>
        <Route path="/sign-in">
          <Login onLoginUser = {handleLoginUser}/>
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} buttonTitle="Сохранить" handleCloseButton={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} buttonTitle="Создать" handleCloseButton={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} handleCloseButton={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupWithForm name="confirm" title="Вы уверены?" buttonTitle="Да" handleCloseButton={closeAllPopups} />
        <ImagePopup card={selectedCard} handleCloseButton={closeAllPopups} />
        <InfoTooltip isOpen = {isInfoTooltipOpen} logged={loggedIn} handleCloseButton={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
