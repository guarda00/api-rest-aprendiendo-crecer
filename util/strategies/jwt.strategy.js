const {Strategy, ExtractJwt}  = require ('passport-jwt')
require('dotenv').config();

const options = {
 jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey : process.env.JWT_SECRET,

}
const jwtStrategy = new Strategy(options, (payload, done)=>{
  return done(null, payload);
});
module.exports = jwtStrategy;