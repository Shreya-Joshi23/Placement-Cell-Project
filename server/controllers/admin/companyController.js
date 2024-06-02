const { validationResult } = require("express-validator");
const  {Company} = require('../../models/Company');

const addcompany = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    parseInt(req.body.package);
    const {company_name,typeofJob,package}=req.body;

    var obj={
        company_name,typeofJob,package
    }


    const company=new Company(obj);
    const newcompany=await company.save();

    return res.status(200).json({
        success: true,
        msg: "Company added successfully",
        data:newcompany
      });

  } catch (error) {
    return res.status(400).json({
        success: false,
        msg: error.message,
      });
  }
};

const getcompanies=async (req,res)=>{
  try{
    const companies=await Company.find({});
    return res.status(200).json({
      success: true,
      msg: "Companies fetched successsfully",
      data:companies
    });
  }catch(error){
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
}

const updatecompany = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const {id,company_name,typeofJob,package}=req.body;

    const isExist=await Company.findOne({_id:id});

    if(!isExist){
        return res.status(400).json({
            success: false,
            msg: "company id not exist",
          });
    }

    //finding companies that are not equal to id
    // const isnameassign=await Company.findOne({
    //   _id:{$ne:id},
    //   name:{
    //     $regex:company_name,
    //     $regex:typeofJob,
    //     $regex:package,
    //     $options:'i'
    //   }
    // });

    // if(isnameassign){
    //     return res.status(400).json({
    //         success: false,
    //         msg: "company already assigned to another ",
    //       });
    // }

    var updatecompany={
        company_name,typeofJob,package
    }

    const updatedcompany = await Company.findByIdAndUpdate({_id:id},{
      $set:updatecompany
    },{new:true})

    return res.status(200).json({
        success: true,
        msg: "company updated successfully",
        data:updatedcompany
      });

  } catch (error) {
    return res.status(400).json({
        success: false,
        msg: error.message,
      });
  }
};

const deletecompany=async (req,res)=>{
  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const {id}=req.body;

    await Company.findByIdAndDelete({_id:id});
    return res.status(200).json({
      success:true,
      msg:"Company deleted successfully"
    })
  }catch(error){
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
}



module.exports={
    addcompany,
    getcompanies,
    updatecompany,
    deletecompany
}
