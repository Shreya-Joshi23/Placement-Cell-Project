const express = require("express");

const router = express();

const auth=require("../middlewares/authMiddleware");
const {statusValidator,appliedplacedValidator}=require('../helpers/statusValidator');

const studentController=require("../controllers/Student/studentController");

router.post('/applyforjob',auth,statusValidator,studentController.applyforjob);

router.get('/applied-companies',auth,studentController.appliedcompanies);

router.get('/placed-companies',auth,studentController.placedcompanies);

module.exports=router;