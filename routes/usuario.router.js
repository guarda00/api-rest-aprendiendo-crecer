const express = require("express");
const passport = require("passport");
const { validatorHandler } = require("../middleware/validator.handler");
const checkRol  = require("../middleware/auth.handler");
const { valCrearUsuario,valDelUsuario  } = require("../middleware/query.handler");
const Usuario = require("../services/usuarios/login.service");
const { crearUsuarioSchema, eliminarUsuarioSchema } = require("../schemas/login.schemas");
const router = express.Router();

router.get(
    "/consultar", 
    async (req, res, next) => {
    try {
        const objUsuario = new Usuario();
        const validar = await objUsuario.mostrarUsuarios();
        
       
        
        res.json(validar);
    } catch (err) {
        next(err);
    }
});

router.post(
  "/registrar", 
  valCrearUsuario("body"),
  validatorHandler(crearUsuarioSchema, "body"),
  async (req, res, next) => {
    try {
      const nuevoUusario = req.body;
      const objUsuario = new Usuario();
      const query = await objUsuario.crearUsuario(nuevoUusario);

      res.json({
        mensaje: "Usuario Creado",
        nombre: nuevoUusario.usuario,
        registrosCreados: `numero de registros insertados: ${query}`,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
    "/eliminar/:usuario", 
    valDelUsuario("params"),
    validatorHandler(eliminarUsuarioSchema, "params"),
    async (req, res, next) => {
  try {
    console.log("Eliminar")
    const { usuario } = req.params;
    const objUsuario = new Usuario();
    const query = objUsuario.eliminarUsuario(usuario);
    //const valQuery = login.verificarQuery(query[0]);
    console.log(query);
    res.json({
      mensaje: `Usuario ${usuario} Eliminado`,
      registrosCreados: query,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
