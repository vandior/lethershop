const mysql = require('mysql2');
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'camprentaldb'
});
db.connect(err=>{
  if(err) console.error(err);
  else console.log('DB connected');
});
module.exports = db;
