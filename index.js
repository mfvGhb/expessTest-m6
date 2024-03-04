const express = require("express");
const usersRouter = require("./routes/users");
const app = express();
var md5 = require('md5');
const port = 3000;

app.get("/p5", (req, res) => res.send("Hello World!"+new Date()) );

app.get("/p6", (req, res) =>{ 
res.send(">>> "+ passK() ) ;
}) ;
  
app.get("/page2", async (req, res) => {
  console.log('>>>>>>',req.query.p1,req.query.p2,'<<<<<<<<<' , new Date()) 
  let isNu = nOk(req.query.p1) && nOk(req.query.p2);
  try {
    if ( isNu)  var r = await f1(Number(req.query.p1),Number(req.query.p2));
    else var r = await f1(1,1) ;
    console.log('r.length=' ,r.length)
    res.json(r) ;  
} catch (error) {
  res.status(500).json({ message: "Error in invocation of API: /products" })
}
})
   
app.use("/users", usersRouter);
app.listen(port, () =>console.log(`Example app listening on port ${port}`))  ; 

let f1=async (p1=0 , p2 =1) =>{
  var authToken = passK();

  var url='http://api.valantis.store:40000/' ;
  var  headers = {  'Content-Type': 'application/json',
                     'X-Auth' : authToken    };
 console.log('>>>>>>>>>>>>>',p1,p2,'<<<<<<<<<' , new Date())  ;                
 var qObj =  { "action": "get_ids",    "params": {"offset":p1 , "limit":p2 }    };                   
 let r1=await fetch(url , { method: 'POST', mode: 'cors', headers , body: JSON.stringify(qObj) }); 
 console.log('r1.status=' , r1.status , r1.ok , new Date().toLocaleString())  ;

let r2=await r1.json() ;
var arr2=  r2.result;
var qObj1 =  { "action": "get_items",  "params": {"ids": [...arr2] }  };
let r3=await fetch(url , { method: 'POST', mode: 'cors', headers , body: JSON.stringify(qObj1) });
console.log('r3.status=' , r3.status , r3.ok , new Date().toLocaleString()) ;
let r4=await r3.json() ;
console.log('r4.result.length=', r4.result.length) ;
return r4.result ;
}

let passK=()=>{
  let d=new Date() ; 
  let dd= d.getDate() ; dd=dd <10 ? '0'+dd : dd ;
  var mnth=d.getMonth()+1; mnth=mnth <10 ? '0'+mnth : mnth ;
  let pass='Valantis_'+d.getFullYear()+mnth+dd ;
  var authToken = md5(pass);
  return authToken
}
let nOk1= num => ((num ^ 0) === num)  && num >0 ;

let nOk=p=> ((+p ^ 0) === +p) && +p >0   ;



