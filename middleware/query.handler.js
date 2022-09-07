const boom = require("@hapi/boom");
const connectionDB = require(".././db/index");

function valCrearUsuario(propiedad) {
  return async (req, res, next) => {
    const { usuario } = req[propiedad];
    const db = await connectionDB();
    const query = await db.query(
      `SELECT * 
        FROM usuarios
        WHERE usuario = '${usuario}'`
    );
    console.log(query);
    console.log("Error Handler");
    if (query[0].length > 0) {
      next(boom.badRequest("Nombre de usuario ya exíste"));
    }
    next();

    // console.log("query eliminar");
    // console.log(query.sqlMessage);
  };
}
function valDelUsuario(propiedad) {
    return async (req, res, next) => {
      const { usuario } = req[propiedad];
  
      const db = await connectionDB();
      const query = await db.query(
        `SELECT * 
          FROM usuarios
          WHERE usuario = '${usuario}'`
      );
      console.log(query);
      console.log("Error Handler");
      if (query[0].length === 0) {
        next(boom.badRequest("Usuario no existe"));
      }
      next();
  
      // console.log("query eliminar");
      // console.log(query.sqlMessage);
    };
  }

module.exports = { valCrearUsuario, valDelUsuario};
