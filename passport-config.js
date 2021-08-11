const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById){

   const authenticateUser = async (email, password, done) => {
      
       const user = getUserByEmail(email)

      if (user == null) // no such user
      {
         return done (null, false, { message: "No user with that email"} )
      }   
      try{
         if(await bcrypt.compare(password, user.password)){
            return done(null, user)
         }
         else {
            return done(null, false, { message: 'password incorrect'})
         }

      }catch(e) {
         return done(e)
      }
         
   }
   
   passport.use(new localStrategy({usernameField: 'email'}, // not needed for password since default value is "password" 
   authenticateUser))

// tell Passport.js how to get information from a user object to store in a session (serialize),
//  and how to take that information and turn it back into a user object (deserialize).


   passport.serializeUser((user, done) => done(null, user.id))
   passport.deserializeUser((id, done) => { 
      return done(null, getUserById(id)) 
   })
}

module.exports = initialize; 