const express  = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler.js');
const app = express();
app.use(cors({
    origin: [
        'https://multi-tenant-saas-one.vercel.app',
        'http://localhost:3000',
        '*'
    ],
    credentials: true,
}));app.use(express.json());
app.use(errorHandler);


app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // 200 requests per 15 mins per IP
}));

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

app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({ status: "ok", db: dbState, uptime: process.uptime() });
});

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


 