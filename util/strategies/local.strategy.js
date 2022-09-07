const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const {Strategy} = require('passport-local');
const userServices = require('./../../services/usuarios/login.service')
const service = new userServices();
const localStrategy = new Strategy({
    usernameField: 'usuario',
    passwordField: 'pass',
  }, 
  async (usuario, pass, done)=>{
    
    try {
        const data = await service.consultarUsuario(usuario);
        if (!data[0]) {
            done(boom.unauthorized(), false);
          }
          const isMath = await bcrypt.compare(pass,data[0].contrasena);
          if(!isMath){
            done(boom.unauthorized(), false);
          }
           done (null, data[0]);
    } catch (error) {
        done(error, false);
    }
    
});

module.exports = localStrategy;