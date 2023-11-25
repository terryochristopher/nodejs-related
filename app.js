const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// express app
const app = express();
// listen to express 
// app.listen(3000);

// MONGODB USER DETAILS
const dbURI = '';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch(err => console.log(err));


// Register view engine
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About' });
});

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about', {title: 'redirecting' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
});

// app.get('/blogs/create', (req, res) => {
//     res.render('create', {title: 'Create' });
// });

//404 page
app.use((req, res) =>{
    res.status(404).render('404', {title: 'Error' });

});