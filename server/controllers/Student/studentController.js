const { jobStatus } = require("../../models/jobStatus");
const { Company } = require("../../models/Company");
const { validationResult } = require("express-validator");

const applyforjob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const userId=req.user._id;
    const { companyId } = req.body;
    var obj = {
      userId: userId,
      companyId: companyId,
      status: 1,
    };

    const apply = new jobStatus(obj);
    const newapply = await apply.save();

    res.status(200).json({
      success: true,
      msg: "Applied for a job successfully",
      data: newapply,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const appliedcompanies = async (req, res) => {
  try {
    const userId = req.user._id;
    const companies = await jobStatus
      .find({ userId, status: 1 })
      .select("companyId");

    if (!companies.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No applied companies found for this user.",
      });
    }

    const companyIds = companies.map((jobStatus) => jobStatus.companyId);

    const appliedcomp = await Company.find({ _id: { $in: companyIds } });

    res.status(200).json({
      success: true,
      msg: "Applied companies data fetched successfully",
      data: appliedcomp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const placedcompanies = async (req, res) => {
  try {
    const userId = req.user._id;
    const companies = await jobStatus
      .find({ userId, status: 2 })
      .select("companyId");

    if (!companies.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No placed companies found for this user.",
      });
    }

    const companyIds = companies.map((jobStatus) => jobStatus.companyId);

    const placedcomp = await Company.find({ _id: { $in: companyIds } });

    res.status(200).json({
      success: true,
      msg: "Placed companies data fetched successfully",
      data: placedcomp,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = {
  applyforjob,
  appliedcompanies,
  placedcompanies,
};
