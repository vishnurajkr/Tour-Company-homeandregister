const express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Assets"));
app.set("view engine", "ejs");

var mysql=require('mysql')
var db=mysql.createConnection({
  host:"localhost",
  port:3306,
  user:"root", 
  password:"",
  database:'travel_db'
});
db.connect((err)=>{
  if(err) throw err;
  console.log("connected")
})

 


app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/registerAction',(req,res)=>{
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var email=req.body.email;
    var mobile=req.body.mobile;
    var newpassword=req.body.newpassw;
    var confirmpassword=req.body.cnfpassw;
    var dob=req.body.dob;
    var address=req.body.address;
    

    var sql='insert into reg_tbl values(?,?,?,?,?,?,?,?,?)'
    db.query(sql,[0,firstname,lastname,email,mobile,newpassword,confirmpassword,dob,address],(err,result)=>{
      if(err) throw err;
      res.send("Thanks for Registering with us We will Contact You Soon")
  })
})

app.listen(3000, () => {
    console.log("server running at http://localhost:3000");
  });