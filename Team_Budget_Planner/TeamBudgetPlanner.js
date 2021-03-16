var budg_list =[];

 
function readFormData() {
    var obj = {}    
    obj.name = document.getElementById("name").value;
    obj.name1 = document.getElementById("name1").value;
    obj.exp = document.getElementById("exp").value;
    
    budg_list.push(obj)
    sessionStorage.setItem("kk",JSON.stringify(budg_list))
    return obj;     
}

function resetData() {
    document.getElementById("name").value = "";
    document.getElementById("name1").value = "";
    document.getElementById("exp").value = "";
};


function getDetails(){

    var jsonString=sessionStorage.getItem("kk");
    console.log(jsonString);
    jsonObject= JSON.parse(jsonString);
    var final_tr= "";
    var total =0; 
    for(let i=0; i< jsonObject.length; i++){
        var tr= "<tr>";
        name_1=jsonObject[i].name;
        name_2=jsonObject[i].name1;
        exp = jsonObject[i].exp;
        total = total + parseFloat(exp);
        tr += "<td>"+name_1+"</td>";
        tr += "<td>"+name_2+"</td>";
        tr += "<td>"+exp+"</td>";
        tr += "</tr>";
        final_tr +=tr;    
    }
    document.getElementById("tbd").innerHTML=final_tr;
    document.getElementById("total_value").innerHTML="Total : " +total;

}