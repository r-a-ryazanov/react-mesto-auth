import React from 'react';
import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';

function Header({name, email, handleExitButton}) {
  const [onMenu, setOnMenu] = React.useState(false);
  const [windowWidth, setwindowWidth] = React.useState();
  function updatewindowWidth(){
    setwindowWidth(document.documentElement.clientWidth);
  }
  React.useEffect(()=>{
    setwindowWidth(document.documentElement.clientWidth);
    window.addEventListener('resize', updatewindowWidth);
    return ()=>{
      window.removeEventListener('resize', updatewindowWidth);
    };
  });
  function handleMenuButton(){
    setOnMenu(true);
  }
  function handleCloseButton(){
    setOnMenu(false);
  }
  if (name === 'Выйти'){
    if(windowWidth < 500){
      if(onMenu) {
        return(
          <header className="header header_on-menu">
            <p className="header__email">{email}</p>
            <button className="header__button" onClick = {handleExitButton}>Выйти</button>
            <div className="header__container">
              <img src={logo} alt="Логотип" className="header__logo"/>
              <button className="header__close-button" aria-label="Меню" onClick = {handleCloseButton}></button>
            </div>
          </header>
        );
      }else{
        return (
          <header className="header">
              <img src={logo} alt="Логотип" className="header__logo"/>
              <button className="header__menu-button" aria-label="Меню" onClick = {handleMenuButton}>
              </button>
          </header>
        );
      }
    }
    return (
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo"/>
          <div className="header__container">
          <p className="header__email">{email}</p>
          <button className="header__button" onClick = {handleExitButton}>Выйти</button>
          </div>
      </header>
    );
  } else if(name === 'Регистрация'){
    return (
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo"/>
          
        <NavLink exact to="/sign-up" className="header__button" >Регистрация</NavLink>
        </header>
    )
  }else if(name === 'Войти'){
    return (
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo"/>
          
        <NavLink exact to="/sign-in" className="header__button" >Войти</NavLink>
        </header>
    )
  }
}
export default Header;
