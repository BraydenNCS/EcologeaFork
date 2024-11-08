function addPost() {
    var response = "";
    var jsonData = new Object();
    jsonData.title = document.getElementById("title").value;
    jsonData.body = document.getElementById("body").value;
    jsonData.date = date();

    if (jsonData.title.replace(" ", "") == "" || jsonData.body.replace(" ", "")  == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }
    if (jsonData.title.length > 99) {
        document.getElementById("message").innerHTML = 'Title must be less than 100 characters!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }
    if (jsonData.body.length > 999) {
        document.getElementById("message").innerHTML = 'Description must be less than 1000 characters!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }
    var request = new XMLHttpRequest();
    request.open("POST", "/add-post", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == undefined) {
            alert('Added Post: ' + jsonData.title);
            document.getElementById("title").value = "";
            document.getElementById("body").value = "";
            window.location.href = 'index.html';
        }
        else {
            document.getElementById("message").innerHTML = 'Unable to add resource!'; document.getElementById("message").setAttribute("class", "text-danger");
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}
function date() {
    var d = new Date();
    var month = (d.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month
    var day = d.getDate().toString().padStart(2, '0');           // Ensure two-digit day
    var year = d.getFullYear();
    return `${year}-${month}-${day}`;
}