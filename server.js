const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const testingRoutes = require('./routes/testingRoutes');
const connectDb = require('./config/db');
//rest object 
const app = express()


//env config
dotenv.config()

//DB Connection
connectDb();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/api/v1/test", require('./routes/testingRoutes'));

app.use("/user", require('./routes/userroutes'));

//rouetr create
app.use("/api/todo", require('./routes/todoRoutes'));

//PORT
const port = process.env.PORT

//listen
app.listen(port, () => {
    console.log(`Node server Running on PORT ${process.env.DEV_MODE} mode on port no ${port} `.bgMagenta);
    // console.log("Running Properly...".bgGreen.white);
});




