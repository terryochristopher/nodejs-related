const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


// express app
const app = express();
// listen to express 
// app.listen(3000);

// MONGODB USER DETAILS
const dbURI = 'mongodb+srv://rcadmin:upgradED21@cluster0.ro5m3to.mongodb.net/rcdatabase?retryWrites=true&w=majority';
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

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
      title: 'new blog',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
    blog.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('656162939f9c5f87913b2cf5')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', {title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About' });
});

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about', {title: 'redirecting' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create' });
});

//404 page
app.use((req, res) =>{
    res.status(404).render('404', {title: 'Error' });

});