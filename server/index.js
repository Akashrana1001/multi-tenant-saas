const express  = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API Running..')
});

const PORT = process.env.PORT  | 5000;
app.listen(PORT,()=>console.log(`server running on Port ${PORT}`));


