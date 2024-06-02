const mongoose=require("mongoose");

const CompanyEligibilitySchema=mongoose.Schema({
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company"
    },
    cgpa:{
        type:Number,
    },
    backlogs:{
        type:Number,
    },
    tenth:{
        type:Number,
    },
    twelth:{
        type:Number,
    }
})

const CompanyEligibility = mongoose.model("compEligibility", CompanyEligibilitySchema);
module.exports = {
    CompanyEligibility,
};