import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
function Login({onLoginUser}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  function onSubmit(e) {
    e.preventDefault();
    onLoginUser({password,email});
  }
  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }
  function handleChangePassword (e) {
    setPassword(e.target.value);
    
  }

  return (
    <div className="login">
      <Header name = "Регистрация"/>
     <form id={`login-form`} name={`login-form`} method="GET" action="#" className="login__form" noValidate onSubmit={onSubmit}>
        <p className="login__title">Вход</p>
        <input type="text" id="email-input" name="email" required placeholder="Email" className="login__input"  value = {email} onChange = {handleChangeEmail}/>
        <input type="password" id="password-input" name="passord" required placeholder="Пароль" className="login__input" value = {password} onChange = {handleChangePassword}/>
        <button type="submit" className="login__button">Войти</button>
        <NavLink exact to="/sign-up" className="login__link">Ещё не зарегистрированы? Регистрация</NavLink>
      </form>
    </div>
      

    
  );
}
export default Login;
