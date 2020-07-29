const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors')
require('dotenv/config')
const app = express()

//Middleware
app.use(cors())
app.use(fileUpload({useTempFiles:true}))
app.use(express.json())


//Importing routes here....
const authRoutes = require('./Routes/auth')
app.use('/users',authRoutes)
const postRoutes = require('./Routes/post')
app.use('/posts',postRoutes)

//connenting to the mongoDb 

mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true  })
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Db.....'))

// app is listening to this port

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server is running on ${PORT}`))