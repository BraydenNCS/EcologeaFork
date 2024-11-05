function viewBlogsFiltered(filter_date) {
    console.log("Called");
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-blogs/default', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = ''
        for (var i = 0; i < response.length; i++) {
            if (response[i].date == filter_date || filter_date == null) {
                html += "<td class='cell'><h4 class='title_display'>" +
                    response[i].title +
                    "<h4>" +
                    "<p class=body_display>" +
                    response[i].body +
                    "</p>" +
                    "<p class='date_display'>$" +
                    response[i].date +
                    "</p>"
            }
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}
