function viewBlogsFiltered(filter_date) {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-blogs/' + filter_date, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = ''
        for (var i = 0; i < response.length; i++) {
            html += "<td class='cell'><h1 class='title_display'>" +
                response[i].title +
                "</h1>" +
                "<p class=body_display>" +
                response[i].body +
                "</p>" +
                "<p class='date_display'>Published:" +
                response[i].date +
                "</p>"
        }
        document.getElementById('tableContent').innerHTML =
            html == '' ? "There were no posts made on this day. Please try resetting your filter." : html;
    };
    request.send();
}
function filter() {
    const filter_date = document.getElementById("filter_date").value;
    if (filter_date === "") {
        alert("Filter field cannot be empty");
        return;
    }
    const current_date = new Date();
    const selected_date = new Date(filter_date);
    if (selected_date > current_date) {
        alert("Filter date cannot be in the future");
        return;
    }
    viewBlogsFiltered(filter_date);
}

function clear_filter() {
    document.getElementById("filter_date").value = "";
    viewBlogsFiltered("default");
}
