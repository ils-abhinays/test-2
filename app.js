const express = require('express')
const route = require('./routes/routes.js')
// const router = express.Router();
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT;

app.use('/', route);

// app.use(app.router);
// route.initialize(app);

app.listen(port,'localhost',()=>{
    console.log(`running... at port http://localhost:${port}`);
    
})
