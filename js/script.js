(function() {
    var xhr = null;
    var data = {};

    function sendXHR(options, callback) {
        xhr = new XMLHttpRequest();
        options.contentType = options.contentType;
        xhr.open(options.type, options.url, true);
        xhr.send(options.data);
        xhr.onreadystatechange = function() {
            if (this.status === 200 && this.readyState === 4) {
                callback(this.response);
            }
        };
    }

    sendXHR({
        url: "http://kexe.dk/dummydata/getlist/",
        type: "GET"
    }, function(response) {
        data = JSON.parse(response);
        addToSelection(data);
    });

    function filterOutput(genre) {
        var result = data.movies.filter(function(movieData) {
                return movieData.categories.indexOf(genre) > -1;
            }),
            output = document.getElementById("output"),
            html = "";
        for (var i = 0; i < result.length; i++) {
            html += "<ul class='fadeIn'>" +
                "<li>" +
                result[i].title +
                "</li>" +
                "</ul>";
        }
        output.innerHTML = html;
    }

    function addToSelection(data) {
        var selection = document.getElementById("selection"),
            html = "";
        html += "<option> -- Select Genre -- </option>";
        for (var i = 0; i < data.categories.length; i++) {
            html += "<option value='" +
                data.categories[i] +
                "'>" +
                data.categories[i] +
                "</option>";
        }
        selection.innerHTML = html;
        selection.onchange = function() {
            filterOutput(this.value);
        };
    }
}());