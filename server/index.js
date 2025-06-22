const express  = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
app.use(cors({
   origin: [
    'https://multi-tenant-saas-one.vercel.app', 
    'http://localhost:3000'        
    ],         
  credentials: true,
}));app.use(express.json());

const authRoutes = require('./routes/auth')

const protectedRoutes = require('./routes/protected');
app.use('/api/protected',protectedRoutes);

const todoRoutes = require('./routes/todo')
app.use('/api/todos',todoRoutes)

const teamRoutes = require('./routes/team');
app.use('/api/team', teamRoutes);

const projectRoutes = require('./routes/projects');
app.use('/api/projects', projectRoutes);


const clientsRoutes = require('./routes/client');
app.use('/api/clients', clientsRoutes);

//connecting the mongoDb
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>
    console.log('connected with MongoDb atlas'))
    .catch((error)=>console.error("mongo db is not coneected ",error))

app.get('/',(req,res)=>{
    res.send('API Running..')
});

app.use('/api/auth',authRoutes);

const PORT = process.env.PORT  || 5000;
app.listen(PORT,()=>console.log(`server running on Port ${PORT}`));


 