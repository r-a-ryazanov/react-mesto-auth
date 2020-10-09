class Api {
  constructor(options) {
    this._options = options;
  }
  
  //-------Функция загрузки карточек с сервера
  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //-----------Функция загрузки информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //------Функция добавления лайка карточке
  changeLikeCardStatus(cardId, isLike) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: isLike ? ('PUT') : ('DELETE'),
      headers: this._options.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //-----Функция удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //---------------Функция обновления данных пользователя
  updateUserInfo(inputData) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //---------Функция обновления аватара пользователя
  updateUserAvatar(inputData) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: inputData
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
   //--------Функция добавления карточки
   addCard(inputData) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //--------Функция регистрации пользователя
  registerUser(registerData, handleError){
    return fetch(`https://auth.nomoreparties.co/signup`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"} ,
      body: JSON.stringify({
        "password": registerData.password,
        "email": registerData.email 
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        handleError();
        if (res.status === 400) return Promise.reject(`Некорректно заполнено одно из полей`);
        
      })
      .catch((err)=>{
        console.log(err);
      });
  }
  //--------Функция авторизации пользователя
  loginUser(loginData, handleError){
    return fetch(`https://auth.nomoreparties.co/signin`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"} ,
      body: JSON.stringify({
        "password": loginData.password,
        "email": loginData.email 
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        handleError();
        if (res.status === 400) {
          return Promise.reject(`Не передано одно из полей`);
        }else if(res.status === 401){
          return Promise.reject(`Пользователь с email не найден `);
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //--------Функция проверки токена
  verifyToken(token){
    return fetch(`https://auth.nomoreparties.co/users/me`, {
      method: 'GET',
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`} 
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        if(res.status === 401) return Promise.reject(`Токен не передан или передан не в том формате`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '0dcb61a0-e155-4c98-8825-cdfb2e75e352',
    'Content-Type': 'application/json'
  }
});
export default api;
