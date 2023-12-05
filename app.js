const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const {getSecret} = require('./secrets');

// express app
const app = express();

async function getvalues(getSecret) {
    try {
        const secret_name = "rc-mongodb-dev";
        const secret = await getSecret(secret_name);
        // connect to mongodb & listen for requests
        const dbURI = secret.dbURI;
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
          console.log('Server is listening on port 3000');
        });
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

};
// Call the function
getvalues(getSecret);
// register view engine
app.set('view engine', 'ejs');
// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});