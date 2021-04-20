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

obj.connect(url,mongodbOption)
let db = obj.connection
db.on("error",err=>console.log(err))
db.once("open",()=>{
    var courseSchema = obj.Schema({
        _cid:Number,
        coursename:String,
        coursedesc:String,
        amount:Number

    })
var Course = obj.model("",courseSchema,"CourseReg")

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

app.get("/add",(req,res)=> {
    res.sendFile(__dirname+"/add.html");
})

app.post("/addcourse",(req,res)=> {
    var myData = new Course({_cid:req.body.courseId,coursename:req.body.courseName,coursedesc:req.body.desc,amount:req.body.amount})
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
})

app.get("/delete",(req,res)=> {
    res.sendFile(__dirname+"/delete.html");
})

app.post("/deletecourse",(req,res)=> {
  //let myquery =req.body.cid;
  mongoClient.connect("mongodb://localhost:27017/meanstack", (err, db) => {
        if(err) throw err;
            // let db = client.db("meanstack")
            console.log("Delete Testing",Number(req.body.cid));
            db.collection("CourseReg").deleteOne({_cid: Number(req.body.cid)}, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
                res.send("records deleted successfully")
                console.log(obj.deletedCount);
                db.close();
            })
    })

})
  

app.get("/update",(req,res)=> {
    res.sendFile(__dirname+"/update.html");
})

app.post("/updatecourse",(req,res)=> {
let id = req.body.coid;
let amt = req.body.amt
  db.collection("CourseReg").updateOne({_cid:Number(id)},{$set:{amount:Number(amt)}},function(res, err) {
    if (err) throw err;
    else{
        console.log("1 document updated")
        
    }
    db.close();
})
})

app.get("/fetchcourse",async(req,res)=> {

    const items = await db.collection('CourseReg').find({}).toArray();
    console.log(items);
    res.send(items)
    })
})
app.listen(port,()=>console.log(`server running on port number" ${port}`));