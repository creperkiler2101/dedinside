$("#id").click(search());

function search() {
    let user = $("#user").val();
    let url = `https://api.github.com/search/users?q=${user}`;

    getJSON(url, function(err, data) {
        if (err !== null && err !== 422) {
            //alert(`Error: ${err}`);
        } else {
            let result = "";
            data.items.array.forEach(val => {
                result += "<div class='user_display'>";
                
                result += "<div class='avatar'>";
                result += `<img alt='image' src='${val.avatar_url}'>`;
                result += "</div>";

                result += "<div class='name'>"
                result += `<h2>${val.login}</h2>`;
                result += "</div>";

                result += "</div>";
            });
            document.getElementById("result").innerHTML = result;
        }
    });

    return false;
}

function getJSON(url, callback) {
    let xmlr = new XMLHttpRequest();
    xmlr.open("GET", url, true);
    xmlr.responseType = "json";
    xmlr.onload = function() {
        let status = xmlr.status;
        if (status === 200) {
            callback(null, xmlr.response);
        } else {
            callback(status, xmlr.response);
        }
    };
    xmlr.send();
}