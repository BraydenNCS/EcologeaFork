// View post
function viewPosts() {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-posts', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = '';
        for (var i = 0; i < response.length; i++) {
            html += '<tr>' +
                '<td>' + response[i].title+ '</td>' +
                '<td>' + response[i].body + '</td>' +
                '<td>' + response[i].date + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-warning" onclick="editResource(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit</button> ' +
                '<button type="button" class="btn btn-danger" onclick="confirmDelete(' + response[i].id + ')">Delete</button>' +
                '</td>' +
                '</tr>';
        }
        console.log(response.id)
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}
// Confirm deletion function
function confirmDelete(selectedId) {
    $('#resourceModal').modal('show');
    document.getElementById('confirmDeleteButton').onclick = function() {
        var confirmInput = document.getElementById('confirmDelete').value;
        if (confirmInput === 'Confirm') {
            deletePost(selectedId, confirmInput);
        } else {
            alert('Please enter "Confirm" to proceed with deletion.\nYou entered \''+confirmInput+'\'');
        }
    };
}
// Delete function
function deletePost(selectedId, confirmDelete) {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("DELETE", "/delete-post/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        alert(response.message)
        if (response.message === "Resource deleted successfully!") {
            console.log('hello')
            window.location.href = 'index.html';
        } else {
            alert('Unable to delete resource!');
        }
    };
    request.send(JSON.stringify({ confirmDelete: confirmDelete }));
}

