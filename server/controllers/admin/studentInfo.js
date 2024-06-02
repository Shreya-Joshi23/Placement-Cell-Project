const { UserDetails } = require("../../models/UserDetails");
const { jobStatus } = require("../../models/jobStatus");
const { validationResult } = require("express-validator");

const getstudents = async (req, res) => {
  try {
    const students = await UserDetails.find({});
    return res.status(200).json({
      success: true,
      msg: "Students fetched successsfully",
      data: students,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const updatestatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { userId, companyId, status } = req.body;
    parseInt(status);
    if(status<0 || status>3){
      return res.status(400).json({
        success: false,
        msg: "invalid status update",
      });
    }

    const updatedoc = await jobStatus.findOneAndUpdate(
      { userId, companyId },
      { status },
      { new: true, upsert: true } 
    );
    return res.status(200).json({
      success: true,
      data: updatedoc,
      msg: "Job Status updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "cannot update job status",
    });
  }
};

module.exports = {
  getstudents,
  updatestatus,
};
