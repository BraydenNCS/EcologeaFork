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
    filter_date = document.getElementById("filter_date").value;
    if (filter_date === "") {
        filter_date = "default"
    }
    console.log(filter_date);
    viewBlogsFiltered(filter_date);
}
