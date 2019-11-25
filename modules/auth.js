const jose = require('jose')
let users = require('../models/users')
const {
  
  JWK,   // JSON Web Key (JWK)
  JWKS,  // JSON Web Key Set (JWKS)
  JWS,   // JSON Web Signature (JWS)
  JWT,   // JSON Web Token (JWT)
  errors // errors utilized by jose
} = jose
const key = JWK.asKey("HelloMyLilFriend")
const createToken = (id,ttype) => JWT.sign({
    iss: "ImCoder",
    sub: 'Auth',
    aud: id,
    iat: new Date(),
    ttype,
    header: {
      typ: "JWT",
      alg: "HS256"
    },
    jti: uuid() 
  },key, {
    expressIn: ttype === 'access' ? '2m' : '10m'
    algorithm: "HS256"
  }
)
const checkAuth = (token,id) => {
    const user = users.find(item => item.id === id)  
       try { 
        user && JWT.verify(token, key, { 
           algorithms: ["HS256"], 
           issuer: "ImCoder", 
           subject: "Auth", 
           audience: id 
         }) 
       } catch (e) { 
         console.log(e.message) 
         return false 
       } 
       return true
}
const authorize = (name,password) => {
    const user = users.find(item => item.name === name)
    if(user && user.password === password) {
        const token = createToken(user.id, 'access')
        const refresh = createToken(user.id, 'refresh')
        return{token, refresh}
}else{
    throw new Error('')
}
     
