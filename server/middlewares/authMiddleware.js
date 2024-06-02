const jwt=require('jsonwebtoken');
// require("dotenv").config();

const verifytoken=async (req,res,next)=>{
    const token=req.body.token || req.query.token || req.headers["authorization"]
    if(!token){
        return res.status(403).json({
            success: false,
            msg: "Token is required for authentication",
          });
    }

    try{
        const bearer=token.split(' ');
        const bearertoken=bearer[1];

        const decodedData=jwt.verify(bearertoken,process.env.ACCESS_SECRET_TOKEN);

        req.user=decodedData.user;
    }catch(error){
        return res.status(400).json({
            success: false,
            msg: "Invalid token",
          });
    }

    return next();
}

module.exports=verifytoken