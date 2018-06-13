const userModule = (function () {
   let user,
       instance;

   const getUser = function(){
       return user
   };

   const setUser = function (users) {
       user = users;
   };

   const createInstance = function () {
       return {
            getUser,
            setUser
       }
   };

   return{
     getInstance: function () {
         return instance || (instance = createInstance());
     }
   }
})();