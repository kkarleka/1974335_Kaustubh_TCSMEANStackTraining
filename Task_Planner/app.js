let http = require("http");
let url = require("url");
var qs = require('querystring');
var qs1= require('qs');
var fs= require('fs');
var path = require('path');
//const { fstat } = require("node:fs");
var jsonArray=[]

let port=9999;
// create array Task array 
let server = http.createServer((req,res)=> {
    console.log(req.url)
    if(req.url=="/store")
        {
            res.setHeader("content-type","text/html");  // by default data consider as a html 
            res.end(
            `<body>
            <h1><u>Task Planner</u></h1>
            <form action="/store/data" method="post">
            
            <label>EmpId</label>
            <input type="text" name="empid"/><br/><br/>
            <label>TaskId</label>
            <input type="text" name="taskid"/><br/><br/>
            <label>Task</label>
            <input type="text" name="task"/><br/><br/>
            <label>Deadline</label>
            <input type="text" name="deadline"/><br/><br/>
            <input type="submit" value="Add Details"/>
        </form>
            </body>
            `);

        }
        else if(req.url=="/store/data")
        {
            var body=''
            console.log(req.url)

            if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                    
               });
                req.on('end', () => {
                    //let data = url.parse(body,true).query;
            
                    var data_1= qs.parse(body)
                    var obj = {"empid":data_1.empid,"taskid":data_1.taskid,"task":data_1.task,"deadline":data_1.deadline}
                   
                    jsonArray.push(obj)
                    console.log(jsonArray)
                });
        
                fs.writeFile('record.json',JSON.stringify(jsonArray),function(err) {     
                    if (err) throw err;
                    console.log("Data is appended to file successfully.")
                    });
            }
            else {
                callback(null);
            }

             
        }else if(req.url=="/delete"){
            res.setHeader("content-type","text/html");  // by default data consider as a html 
            res.end(
            `<form action="/delete/data" method="post">
            <label>Task Id</label>
            <input type="text" name="taskid"/><br/><br/>
            <input type="submit" value="Delete"/>
        </form>`);

       }
        else if(req.url=="/delete/data")
        {
            var data_1=""
            if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                    
               });

               req.on('end', () => {
                //let data = url.parse(body,true).query;
                var response= qs.parse(body)
                data_1= response.taskid
                console.log(data_1)
                console.log(jsonArray)
                for( var i = 0; i < jsonArray.length; i++)
                { 
                    if ( jsonArray[i].taskid === data_1) { 
                        jsonArray.splice(i, 1); 
                    }
                }
                console.log(jsonArray)
            });
            fs.unlink(path.join(__dirname,"record.json"),(err)=>{
                if (err) throw err;
                console.log('file deleted successfully...')
            fs.writeFile('record.json',JSON.stringify(jsonArray),function(err) {     
                if (err) throw err;
                  console.log("Data is appended to file successfully.")
                    });
            });
            }
        }
        else if(req.url=="/display"){
               var str=" <table style='border: 1px solid black;'>";
               str+= "<tr>"
               str+=  "<th style='border: 1px solid black;'>Emp Id</th>"
               str+=  "<th style='border: 1px solid black;'>Task Id</th>"
               str+=  "<th style='border: 1px solid black;'>Task</th>"
               str+=  "<th style='border: 1px solid black;'>Deadline</th>"
               str+= "</tr>"
                str +=""
                for (let i=0;i<jsonArray.length;i++){
                    let value= jsonArray[i]
                    str += "<tr>"
                    str += "<td style='border: 1px solid black;'>"+value.empid+"</td>"
                    str += "<td style='border: 1px solid black;'>"+value.taskid+"</td>"
                    str += "<td style='border: 1px solid black;'>"+value.task+"</td>"
                    str += "<td style='border: 1px solid black;'>"+value.deadline+"</td>"
                    str += "</tr>"
                }
                str +=" </table>";
                res.end(str)
        }

        
    
    
});

server.listen(port,()=>console.log(`Server running on port number ${port}`));

    

