import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Header from './Header';
function Register({onRegisterUser}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  function onSubmit(e) {
    e.preventDefault();
    onRegisterUser({email, password});
  }
  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }
  function handleChangePassword (e) {
    setPassword(e.target.value);
  }
  return (
    <div className="login">
      <Header name = "Войти"/>
     <form id={`register-form`} name={`register-form`} method="GET" action="#" className="login__form" noValidate onSubmit={onSubmit}>
        <p className="login__title">Регистрация</p>
        <input type="text" id="email-input" name="email" required placeholder="Email" className="login__input"  value = {email} onChange = {handleChangeEmail}/>
        <input type="password" id="password-input" name="passord" required placeholder="Пароль" className="login__input" value = {password} onChange = {handleChangePassword}/>
        <button type="submit" className="login__button">Зарегистрироваться</button>
        <NavLink exact to="/sign-in" className="login__link">Уже зарегистрированы? Войти</NavLink>
      </form>
    </div>    
  );
}
export default withRouter(Register);