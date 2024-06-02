const {check}=require('express-validator');

exports.statusValidator=[
    check('userId','userid is required').not().isEmpty(),
    check('companyId','companyId is required').not().isEmpty(),
    check('status','status is required').not().isEmpty(),
];
