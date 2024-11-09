function editPost(data) {
    var selectedPost = JSON.parse(data);
    document.getElementById("editTitle").value = selectedPost.title;
    document.getElementById("editDesc").value = selectedPsost.body;
    document.getElementById("updateButton").setAttribute("onclick", 'updatePost("' +
        selectedPost.id + '")');
    $('#editPostModal').modal('show');
}

function updatePost(id) {
    console.log(id)
    var response = "";
    var jsonData = new Object();
    jsonData.title = document.getElementById("editTitle").value;
    jsonData.body = document.getElementById("editDesc").value;
    var now = new Date();
    var datetime = now.toLocaleString();
    jsonData.date = datetime;
    if (jsonData.title == "" || jsonData.body == "") {
        document.getElementById("editMessage").innerHTML = 'All fields are required!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }
    if (jsonData.title.length > 100) {
        document.getElementById("editMessage").innerHTML = 'Your title is too long!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }
    var request = new XMLHttpRequest();
    request.open("PUT", "/edit-post/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "Post has been updated!") {
            document.getElementById("editMessage").innerHTML = 'Edited Post: ' +
                jsonData.name + '!';
            document.getElementById("editMessage").setAttribute("class",
                "text-success");
            window.location.href = 'index.html';
        }
        else {
            document.getElementById("editMessage").innerHTML = 'Unable to edit post!';
            document.getElementById("editMessage").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}