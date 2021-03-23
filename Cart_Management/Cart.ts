let budg_list: cartclass[] = [];

class cartclass{
   public  appwatch : String;
   public  pp1 : Number;

   constructor(appwatch: String, pp1: Number){
       this.appwatch = appwatch;
       this.pp1 = pp1;
   }
}



var obj : cartclass;   
function  readData(title:String,price:Number){
    let x : cartclass = new cartclass(title,price)
    budg_list.push(x);
    sessionStorage.setItem("kk",JSON.stringify(budg_list))
    let str=  budg_list.length
    document.getElementById("total-count").innerHTML=String(str);
    return obj;     
}

function getDetails(){
    let jsonString=sessionStorage.getItem("kk");
    console.log(jsonString);
    let jsonObject= JSON.parse(jsonString);
    let final_tr= "";
    let total =0; 
    for(let i=0; i< jsonObject.length; i++){
        var tr= "<tr>";
        let appwatch=jsonObject[i].appwatch;
        let pp1=jsonObject[i].pp1;
        total = total +pp1;
        let sr_no =i+1
        tr += "<td>"+sr_no+"</td>";
        tr += "<td>"+appwatch+"</td>";
        tr += "<td>"+pp1+"</td>";
        tr += "</tr>";
        final_tr +=tr;    
    }
    document.getElementById("tbd").innerHTML=final_tr;
    document.getElementById("total_value").innerHTML="Total : " +total;
}  