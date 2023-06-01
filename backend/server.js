const express = require('express');
require('dotenv').config()
const app = express();
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose')
const {logger, logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHnadler');
const coreOption = require('./config/coreOption');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConnect')



const PORT = process.env.Port || 4500

connectDB()
console.log(process.env.NODE_ENV)




app.use(logger)
app.use(cors(coreOption))
app.use(express.json())
app.use(cookieParser())


app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });

  app.use(errorHandler)

  mongoose.connection.once("open", () => {
    console.log("connected to mongoDB");
    app.listen(PORT, () =>console.log(`server listen on port ${PORT}`))
  })
  mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
  })


