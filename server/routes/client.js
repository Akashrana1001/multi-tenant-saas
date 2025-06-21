const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const authmiddleware = require('../middleware/authmiddleware');

router.get('/',authmiddleware,async (req,res)=>{
    try{
        const clients = await Client.find({tenantId: req.user.tenantId});
        res.json(clients);
    }catch(err){
        res.status(500).json({message:"Error fetching the clients"});
    }
})

//POSt for adding clients

router.post('/',authmiddleware,async (req,res)=>{
    try{
        const {name,email,phone} = req.body;
        const client = new Client({
            name,
            email,
            phone,
            tenantId:req.user.tenantId
        });
        await client.save();
        res.status(201).json(client);
    }
    catch(err){
        console.log(err);
        
            res.status(500).json({ message: 'Error creating client' });
    }
});

module.exports = router;