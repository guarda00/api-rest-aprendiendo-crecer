const express = require ('express');
const usuarioRouter = require('./usuario.router');
const authRouter = require('./auth.router');

const routerApi = (app)=>{
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/usuario', usuarioRouter);
    router.use('/auth', authRouter)
}

module.exports = routerApi;
