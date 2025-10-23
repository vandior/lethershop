const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({origin:true,credentials:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24*60*60*1000,
    sameSite: 'lax',
    secure: false  
  }
}));

app.use(express.static(path.join(__dirname,'..','public')));

app.use('/api/auth',require('./routes/auth'));
app.use('/api/products',require('./routes/products'));
app.use('/api/orders',require('./routes/orders'));
app.use('/api/users',require('./routes/users'));


app.listen(3000,()=>console.log('Server running at http://localhost:3000'));
