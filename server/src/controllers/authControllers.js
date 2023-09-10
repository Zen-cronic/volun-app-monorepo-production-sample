const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const requiredInputChecker = require('../helpers/requiredInputChecker')
const asyncHandler = require('express-async-handler')
require('dotenv').config();

const login = asyncHandler(async(req, res) => {


    const {userId, password} = req.body

    //req.body must be an object
    if(requiredInputChecker(req.body)){

        return res.status(400).json({message: "All fields required"})
    }

    const existingUser = await UserModel.findOne({userId})


    if(!existingUser){

        return res.status(400).json({message: "id not registered"})

    }


    const isValidPwd = await bcrypt.compare(password, existingUser.password)

    if(!isValidPwd){
        return res.status(400).json({message: "Wrong password"})

    }

    //accessToken & refreshToken aft suvveccful login

    const accessToken = jwt.sign(
        {

        UserInfo : {
            userId: existingUser.userId,
            role: existingUser.role
             }
        },

        process.env.ACCESS_TOKEN,
        {
            expiresIn: '15s'
        }
    
    )

    const refreshToken = jwt.sign(
        {

        userId: existingUser.userId

        },

        process.env.REFRESH_TOKEN,

        {
            expiresIn: '30s'
        }
    
    )

    res.cookie(
        'jwt', 
        refreshToken,
        {

            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 30 * 10000
        })

    //for authorization
    res.json({accessToken})

})



module.exports = {
    login,

};
