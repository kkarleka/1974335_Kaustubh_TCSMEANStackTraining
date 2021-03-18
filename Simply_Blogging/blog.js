var jsonString =localStorage.getItem("kk");
console.log("jsons tring" +jsonString)

if(jsonString==null){
    budg_list=[];
}
else{
    budg_list= jsonString;
}

function addBlog(){
    let obj = {} 
    obj.title = document.getElementById("title").value;
    obj.desc = document.getElementById("desc").value;
    obj.imageInfo = document.getElementById("imageId").files[0].name;

    budg_list.push(obj)
    localStorage.setItem("kk", JSON.stringify(budg_list))
    var jsonString=localStorage.getItem("kk");
    jsonObject= JSON.parse(jsonString);
    console.log(jsonObject)
    let adddiv = document.getElementById('add')

    let title = jsonObject[jsonObject.length-1].title;
    let desc = jsonObject[jsonObject.length-1].desc;
    let image = jsonObject[jsonObject.length-1].imageInfo;

    let titleInfo = document.createElement('div');
    let descInfo = document.createElement('div');
    let imageInfo = document.createElement('img');
    titleInfo.id = "titleInfo";
    descInfo.id = "descInfo";
    imageInfo.id = "imageInfo";
    titleInfo.innerHTML = title;
    descInfo.innerHTML = desc;
    imageInfo.src = image;
    imageInfo.className= "imageInfo";

    let di = document.createElement('div')
    di.id = "innerdiv";

    di.appendChild(titleInfo);
    di.appendChild(descInfo);
    di.appendChild(imageInfo);

    adddiv.appendChild(di);
}

function display_existing_local_element(){
    var jsonString=localStorage.getItem("kk");
    console.log(jsonString);
    var result="";
    if(jsonString!=null){
        for(let i=0;i<JSON.parse(jsonString).length;i++)
        {
            result +="<div id='innerdiv'>";
            var obj= JSON.parse(jsonString)[i];
            let title=obj.title;
            let desc= obj.desc;
            let imageInfo=obj.imageInfo;
            result += "<div id='titleInfo"+i+"'>"+title+"</div>";
            result += "<div id='descInfo"+i+"'>"+desc+"</div>";
            result += "<img src="+imageInfo+" class='imageInfo' id='imageInfo"+i+"'/>";
            result +="</div>";
    
        }
      
        document.getElementById('add').innerHTML=result;
        console.log("Sai")
        
    }
    }

function resetData() {
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("imageId").value = "";
};

