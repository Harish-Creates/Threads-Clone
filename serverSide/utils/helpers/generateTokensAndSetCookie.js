const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({userId},process.env.SecretKey,{
        expiresIn: "1d",
    })

    res.cookie("jwt",token,{
        httpOnly: true,
        maxAge: 1*24*60*60*1000,
        sameSite: "strict"
    })

    return token;
}

module.exports={
    generateTokenAndSetCookie
}