const express = require('express');
const hbs= require('hbs');
const fs= require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
// middleware is used to tweak the functionality of express
// app.set for handlebars and app.use for middlewares
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n');
  console.log(log);
  next();
});

// app.use((req,res,next) => {
//   res.render('maintainence.hbs');
// });



hbs.registerHelper('currentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {

  res.render('home.hbs',{
    welcomeMessage: 'Welcome to my website',
    pageTitle: 'Home Page'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    pageTitle: 'Projects'
  });
});

app.get('/bad',(req,res) => {

  res.send({
    errorMessage :'Unable to fetch the website'
  });
});
app.listen(port , ()=> {
  console.log(`Server is up on port ${port}`)
});
