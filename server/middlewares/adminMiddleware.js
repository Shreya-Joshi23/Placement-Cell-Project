const onlyAdminAccess=async (req,res,next)=>{
    try{
        console.log(req.user.role);
        if(req.user.role!=1){//not a admin
            return res.status(400).json({
                success:false,
                msg:'You have no access to this route'
            });
        }
    }catch(error){
        return res.status(400).json({
            success:false,
            msg:'Something went wrong'
        })
    }
    return next();
}

module.exports={
    onlyAdminAccess,
}