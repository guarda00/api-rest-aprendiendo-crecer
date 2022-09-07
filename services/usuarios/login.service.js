const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const connectionDB = require("../.././db/index");
const sequelize = require("../../db/sequelize.db");

class Usuario {
  async mostrarUsuarios() {
   
    const query = 
      `SELECT usuario, contrasena
      FROM usuarios
      `;
    const db = await sequelize.query(query);
    console.log(db[0]);
    if (db[0].length === 0) {
      throw boom.badRequest("No existen registros para mostrar");
    }
    console.log(query.usuario);
    console.log(query[0]);
    console.log(typeof query[0]);
    const { usuario, contrasena } = query[0];
    console.log(usuario);
    return db[0];
  }

  async crearUsuario(usuario) {
    try {
      const newPass = await bcrypt.hash(usuario.pass, 10);
         
      const query = `INSERT INTO usuarios (usuario, contrasena, role) VALUES('${usuario.usuario}','${newPass}', '${usuario.usuario}')`;
      console.log(`${usuario.usuario} ---> ${newPass}---`);
      console.log(` ${newPass.length}`);
      console.log(` ${query}`);

      const db = await sequelize.query(query);
      console.log(` ${db}`);
      return db;
    } catch (error) {
      throw boom.notFound("Se ha produciado en error al Insertar los datos");
    }
  }

  async eliminarUsuario(usuario) {
    try {
      const db = await connectionDB();
      const query = await db.query(
        `DELETE 
        FROM usuarios 
        WHERE usuario = '${usuario}'`
      );
      console.log(usuario);
      return query;

      } catch (err) {
      console.log("entro elimina");
      throw boom.badRequest("Usuario no encontrado");
    }
  }

  async consultarUsuario(usuario) {
    const db = await connectionDB();
    const query = await db.query(
      `SELECT * 
      FROM usuarios
      WHERE usuario = '${usuario}'`
    );
    console.log(query[0]);
    return query[0];
  }
}

module.exports = Usuario;
