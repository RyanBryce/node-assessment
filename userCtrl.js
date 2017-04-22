const users = require('./users.js')

module.exports ={

  readAll: function() {
    let allUsers = users.find()
    return allUsers
  },

  findUserById: (id) => {
    let res = users.findOne('id', id)
    if (res) {
      return res
    }else {
      return null
    }
  },

  getAdmins: () => {
    let res = users.find('type', 'admin')
    if(res.length === 0){
      return null
    } else{
      return res
    }
  },

  getNonAdmins: () => {
    let res = users.find('type', 'user')
    if(res.length === 0){
      return null
    } else{
      return res
    }
  },

  getUsersByFavorite: (favorite)=>{
    let res = users.find()
    let favorites = []
    for(let i = 0; i < res.length; i++){
      for(let f = 0; f < res[i].favorites.length; f++){
        if(favorite = res[i].favorites[f]){
          favorites.push(res[i])
        }
      }
    }
    if(favorites.length = 0){
      return null
    } else{
      return favorites
    }
  },

  getUsersByAgeLimit: (age) =>{
    let res = users.find()
    let ageRes = []
    for(let i = 0; i < res.length; i++){
      if(age >= res[i].age){
        ageRes.push(res[i])
      }
     }
     if(ageRes.length = 0){
       return null
     } else{
       return ageRes
     }
   },

   findUserByQuery: (query, value) => {
     if(query === 'last_name') {
      return users.find('last_name', value)
    } else
    if(query === 'email') {
      return users.find('email', value)
    } else
    if(query === 'state') {
      return users.find('state', value)
    }else {
      return null
    }
  },

  createUser: function (obj) {
    let user = users.add(obj);
    return user
  },

  updateUser: (userId, obj) => {
    let updatedUser = users.update('id', userId, obj)
    if (updatedUser) {
      return updatedUser
    }
  },

  removeUser: (userId) => {
    deletedUser = users.remove('id', userId)
    return deletedUser
  }

}
