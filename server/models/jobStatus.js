const mongoose=require("mongoose");

const jobStatusSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company"
    },
    status:{
        type:Number,//0-not applied 1-applied 2-interview 3-placed
        default:0
    }
})

const jobStatus = mongoose.model("jobStatus", jobStatusSchema);
module.exports = {
    jobStatus,
};
