// import { data } from "jquery";

class Api {
    constructor(options) {
      this._url = options.baseUrl;
    }
    
    _checkResponse(res){
       return res.ok ? res.json() : Promise.reject
    }


    getInfo(token){
        return fetch(`${this._url}/users/me`,{
            headers:{
                'Authorization' : `Bearer ${token}`            }
        })
        .then(this._checkResponse)
    }

    getCards(token){
        return fetch(`${this._url}/cards`,{
            headers:{
                'Authorization' : `Bearer ${token}`            }
        })
        .then(this._checkResponse)
    }

    setUserInfo(data, token){
        return fetch(`${this._url}/users/me`,{
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`},
            body: JSON.stringify({
                name: data.name,
                about: data.description,
            })
        })
        .then(this._checkResponse)
    };

    setNewAvatar(data, token){
        return fetch(`${this._url}/users/me/avatar`,{
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`},
            body: JSON.stringify({
               avatar: data.avatar
            })
        })
        .then(this._checkResponse)
    };

    addCard(data, token){
        return fetch(`${this._url}/cards`,{
            method: 'POST',
            headers: { 
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`},
            body: JSON.stringify({
               name: data.title,
               link: data.link
               
            })
        }) 
        .then(this._checkResponse)      
    }

    addLike(cardId, token){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'PUT',
            headers: { 'Authorization' : `Bearer ${token}`},
        }) 
        .then(this._checkResponse)      
    }   

    delLike(cardId, token){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'DELETE',
            headers: { 'Authorization' : `Bearer ${token}`},
        }) 
        .then(this._checkResponse)      
    }   

    delCard(cardId, token){
        return fetch(`${this._url}/cards/${cardId}`,{
            method: 'DELETE',
            headers: { 
                'Authorization' : `Bearer ${token}`
            },
        }) 
        .then(this._checkResponse)      
    }   


}
const api = new Api({
    baseUrl: 'http://api.mesto.vadimo.nomoredomainsicu.ru',
  });

  export default api;