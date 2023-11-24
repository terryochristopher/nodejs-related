const express = require('express');

// express app
const app = express();


// Register view engine
app.set('view engine', 'ejs');


// listen to express 
app.listen(3000);

app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname });
    res.render('index');
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {root: __dirname });
});

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//404 page
app.use((req, res) =>{
    res.sendFile('./views/404.html', {root: __dirname});

});