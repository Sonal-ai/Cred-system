const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const { connectDb } = require('./connection');

//import routes
const Cardrouter = require('./routes/cards');
const Historyrouter = require('./routes/history');
const Rulesrouter = require('./routes/rules');
const Creditsrouter = require('./routes/credits');

connectDb(process.env.URI)
    .then(()=>{
        console.log('connected to mongoDB successfully')
    }).catch((err)=>{
        console.log('connection failed : ',err)
    })

app.listen(process.env.PORT,(err)=>{
    if (err){
        console.log(`err in listning the port : ${err}`)
    }else{
        console.log(`listening on port ${process.env.PORT}`);
    }
})

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', Cardrouter);
app.use('/history',Historyrouter);
app.use('/rules',Rulesrouter);
app.use('/credits', Creditsrouter);
