class Api {
  constructor(options) {
    this._options = options;
  }
   handleResponse = res =>{
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
  //-------Функция загрузки карточек с сервера
  getInitialCards(token) {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`}  
    })
      .then(this.handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  //------Функция добавления/удаления лайка карточке
  changeLikeCardStatus(cardId, isLike, token) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: isLike ? ('PUT') : ('DELETE'),
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`}
    })
      .then(this.handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }
  //-----Функция удаления карточки
  deleteCard(cardId, token) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`}
    })
      .then(this.handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }
  //---------------Функция обновления данных пользователя
  updateUserInfo(inputData, token) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`},
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about
      })
    })
      .then(this.handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }
  //---------Функция обновления аватара пользователя
  updateUserAvatar(inputData, token) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`},
      body: JSON.stringify({
        avatar: inputData
      })
    })
      .then(this.handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }
   //--------Функция добавления карточки
   addCard(inputData, token) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`},
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
      .then(this.handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }
  //--------Функция регистрации пользователя
  registerUser(registerData, handleError){
    return fetch(`${this._options.baseUrl}/users/signup`, {
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
    return fetch(`${this._options.baseUrl}/users/signin`, {
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
    return fetch(`${this._options.baseUrl}/users/me`, {
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
  baseUrl: 'https://api.ryazanov.students.nomoreparties.co',
  
});
export default api;
