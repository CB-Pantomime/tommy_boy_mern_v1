
require('dotenv').config()
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middlewares:
app.use(cors());
// for serving static files from public folder (for static pages)
app.use(express.static('public'));
// image upload middlewares
// Important here below for 413 http error code fixing:
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ 
  limit: '500mb', 
  extended: true,
  parameterLimit: 100000
}));



app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/uploads', express.static('uploads'));

// Register routes with our instance of express
app.use('/api/v1/blogs', blogRoutes)
app.use('/api/v1/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 