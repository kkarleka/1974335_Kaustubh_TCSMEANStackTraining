var budg_list = [];
var cartclass = /** @class */ (function () {
    function cartclass(appwatch, pp1) {
        this.appwatch = appwatch;
        this.pp1 = pp1;
    }
    return cartclass;
}());
var obj;
function readData(title, price) {
    var x = new cartclass(title, price);
    budg_list.push(x);
    sessionStorage.setItem("kk", JSON.stringify(budg_list));
    var str = budg_list.length;
    document.getElementById("total-count").innerHTML = String(str);
    return obj;
}
function getDetails() {
    var jsonString = sessionStorage.getItem("kk");
    console.log(jsonString);
    var jsonObject = JSON.parse(jsonString);
    var final_tr = "";
    var total = 0;
    for (var i = 0; i < jsonObject.length; i++) {
        var tr = "<tr>";
        var appwatch = jsonObject[i].appwatch;
        var pp1 = jsonObject[i].pp1;
        total = total + pp1;
        var sr_no = i + 1;
        tr += "<td>" + sr_no + "</td>";
        tr += "<td>" + appwatch + "</td>";
        tr += "<td>" + pp1 + "</td>";
        tr += "</tr>";
        final_tr += tr;
    }
    document.getElementById("tbd").innerHTML = final_tr;
    document.getElementById("total_value").innerHTML = "Total : " + total;
}
