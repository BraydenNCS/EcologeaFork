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
                '<td>' + response[i].title + '</td>' +
                '<td>' + response[i].body + '</td>' +
                '<td>' + response[i].date + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-warning" onclick="editPost(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit</button> ' +
                '<button type="button" class="btn btn-danger" onclick="confirmDelete(\'' + response[i].id + '\')">Delete</button>' +
                '</td>' +
                '</tr>';
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}

// Confirm deletion function
function confirmDelete(selectedId) {
    console.log(selectedId)
    document.getElementById('confirmDelete').value = ''
    $('#resourceModal').modal('show')
    document.getElementById("confirmDeleteButton").focus()
    var confirmDeleteButton = document.getElementById('confirmDeleteButton')
    confirmDeleteButton.onclick = null
    confirmDeleteButton.onclick = function () {
        var confirmInput = document.getElementById('confirmDelete').value
        console.log(confirmInput)
        if (confirmInput === 'Confirm') {
            deletePost(selectedId, confirmInput)
        } else if (confirmInput === '') {
            alert('Please use your keyboard to type a word');
        } else {
            alert('Please enter "Confirm" to proceed with deletion.\nYou entered \'' + confirmInput + '\'')
        }
    };
}

// Delete function
function deletePost(selectedId, confirmDelete) {
    var response = '';
    var request = new XMLHttpRequest();
    request.open("DELETE", "/delete-post/" + selectedId, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message === "Resource deleted successfully!") {
            alert(response.message);
            window.location.href = 'index.html';
        } else {
            alert('Unable to delete resource!');
        }
    };
    request.send(JSON.stringify({ confirmDelete: confirmDelete }));
}
