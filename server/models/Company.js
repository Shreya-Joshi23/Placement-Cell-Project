const mongoose=require("mongoose");

const CompanyDetailsSchema = mongoose.Schema(
    {
     company_name:{
        type:String,
        required:true,
     },
     typeofJob:{
        type:String,
        required:true,
     },
     package:{
        type:Number,
        required:true,
     }
    },
    { timestamps: true }
  );

const Company = mongoose.model("Company", CompanyDetailsSchema);
module.exports = {
    Company,
};