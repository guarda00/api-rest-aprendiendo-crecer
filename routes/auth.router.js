const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const router = express.Router();
router.post(
    "/login", 
    passport.authenticate('local', { session: false }), 
    async (req, res, next) => {
    try {
        const user = req.user;
        console.log(user);
        const payload = {
            sub: user.id,
            role: user.role
        }
       const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        });

        res.status(200).json({user,
            token});
    } catch (err) {
        next(err);
    }
});



module.exports = router;
