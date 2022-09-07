const boom =  require('@hapi/boom');

function checkRol(role){
    return (req, res, next)=>{
        const user  = req.user;
        if (role.includes(user.role)){
            next();
        }else{
            next(boom.forbidden());
        }
    }
}

module.exports = checkRol;