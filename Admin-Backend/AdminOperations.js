let app = require('express')();
let bodyParser = require("body-parser")
let port = 9090
app.use(bodyParser.urlencoded({extended: true}))
let mongoClient = require("mongodb").MongoClient;
let obj = require("mongoose");
obj.Promise = global.Promise
let url = "mongodb://localhost:27017/meanstack"
const mongodbOption ={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
var textEmpId;
var text = "";
obj.connect(url,mongodbOption)
let db = obj.connection
db.on("error",err=>console.log(err))
db.once("open",()=>{
    var EmployeeSchema = obj.Schema({
        firstname:String,
        lastname:String,
        email:String,
        emp_id:Number,
        pwd:String

    })

    var Emp = obj.model("",EmployeeSchema,"Employee")

    app.get("/",(req,res)=> {
        res.sendFile(__dirname+"/index.html");
    })
    
    app.get("/add",(req,res)=> {
        res.sendFile(__dirname+"/add.html");
    })
   
    
    app.post("/addemployee",(req,res)=> {
        
        var possible = "0123456789";
                  
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        var pass = "";
        pass = "welcome"+String(text)
        var myData = new Emp({firstname:req.body.fname,lastname:req.body.lname,email:req.body.email,emp_id:text,pwd:pass})
        console.log("works!")
        myData.save((err,result)=>{
            if(!err){
                console.log("records inserted successfully" +result)
                res.send("records inserted successfully")
            }
            else{
                 console.log(err)  
            }
            obj.disconnect();
       })
       textEmpId = text;
    })
    
    app.get("/delete",(req,res)=> {
        res.sendFile(__dirname+"/delete.html");
    })
    
    app.post("/deleteemployee",(req,res)=> {
      //let myquery =req.body.cid;
      mongoClient.connect("mongodb://localhost:27017/meanstack", (err, client) => {
            if(err) throw err;
                let db = client.db("meanstack")
                console.log("Delete Testing",textEmpId);
                db.collection("Employee").deleteOne({emp_id: Number(textEmpId)}, function(err, obj) {
                    if (err) throw err;
                    console.log("1 document deleted");
                    res.send("records deleted successfully")
                    console.log(obj.deletedCount);
                    client.close();
                })
        })
    
    })
})
app.listen(port,()=>console.log(`server running on port number" ${port}`));
      