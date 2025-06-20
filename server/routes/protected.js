const express = require('express')

const authmiddleware = require('../middleware/authmiddleware');


const router = express.Router();

router.get('/dashboard',authmiddleware,(req,res)=>{
    res.json({
        message: `Welcome User ${req.user.id} of tenant ${req.user.tenantId}`,
    })
})
module.exports  = router;
