const Joi = require("joi");

// La contraseña debe tener al entre 8 y 16 caracteres,
// al menos un dígito,
// al menos una minúscula y al menos una mayúscula.
// NO puede tener otros símbolos.

const usuario = Joi.string().min(3).max(15);
const pass = Joi.string().pattern(
  new RegExp('^[a-zA-Z0-9]{5,30}$')
);
const role = Joi.string();

const crearUsuarioSchema = Joi.object({
    usuario: usuario.required(),
    pass: pass.required(),
    role: role.required(),

});

const eliminarUsuarioSchema = Joi.object({
    usuario: usuario.required(),

});

module.exports = {crearUsuarioSchema, eliminarUsuarioSchema}
