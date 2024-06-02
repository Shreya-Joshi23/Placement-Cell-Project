const {check}=require('express-validator');

exports.companyaddValidator=[
    check('company_name','company name is required').not().isEmpty(),
    check('typeofJob','Job type is required').not().isEmpty(),
    check('package','Package is required').not().isEmpty(),
];

exports.companydeleteValidator=[
    check('id','Id is required').not().isEmpty(),
];

exports.companyupdateValidator=[
    check('id','Id is required').not().isEmpty(),
    check('company_name','Company name is required').not().isEmpty(),
    check('typeofJob','Job type is required').not().isEmpty(),
    check('package','Package is required').not().isEmpty()
];

exports.categoryaddValidator=[
    check('category_name','category_name is required').not().isEmpty(),
]

