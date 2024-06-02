const express = require("express");
const router = express();

const auth=require("../middlewares/authMiddleware");
const companyController=require('../controllers/admin/companyController');
const studentInfo=require('../controllers/admin/studentInfo');


const {onlyAdminAccess}=require("../middlewares/adminMiddleware")
const {companyaddValidator,companydeleteValidator,companyupdateValidator}=require('../helpers/adminValidator');
const {statusValidator}=require('../helpers/statusValidator');

//Company routes
router.post('/add-company',auth,onlyAdminAccess,companyaddValidator,companyController.addcompany);
router.get('/get-companies',auth,companyController.getcompanies);
router.post('/delete-company',auth,onlyAdminAccess,companydeleteValidator,companyController.deletecompany);
router.post('/update-company',auth,onlyAdminAccess,companyupdateValidator,companyController.updatecompany);
router.get('/allstudentinfo',auth,onlyAdminAccess,studentInfo.getstudents);
router.post('/updatestatus',auth,onlyAdminAccess,statusValidator,studentInfo.updatestatus);

module.exports=router;