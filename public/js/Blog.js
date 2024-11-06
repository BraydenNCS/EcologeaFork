function viewPosts() {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-resources', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = '';
        for (var i = 0; i < response.length; i++) {
            html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + response[i].title + '</td>' +
                '<td>' + response[i].location + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-warning" onclick="editResource(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit</button> ' +
                '<button type="button" class="btn btn-danger" onclick="confirmDelete(' + response[i].id + ')">Delete</button>' +
                '</td>' +
                '</tr>';
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}
function confirmDelete(selectedId) {
    $('#resourceModal').modal('show');
    document.getElementById('confirmDeleteButton').onclick = function() {
        var confirmInput = document.getElementById('confirmDelete').value;
        if (confirmInput === 'Confirm') {
            deleteResource(selectedId, confirmInput);
        } else {
            alert('Please enter "Confirm" to proceed with deletion. You entered \''+confirmInput+'\'');
        }
    };
}

function deleteResource(selectedId, confirmDelete) {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("DELETE", "/delete-resource/" + selectedId, true);
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

