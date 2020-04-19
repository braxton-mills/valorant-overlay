function update() {
    getJSON(getPath() + '/api/123', (err, data) => {
        if (err !== null || data === null) {
            console.log('Something went wrong: ' + err);
        } else {
            console.log(data);
            updateTeamData("team1", data.team1);
            updateTeamData("team2", data.team2);
            setTimeout(update, 1000);
        }
    });
}

function updateTeamData(teamName, data) {
    if (!data) {
        console.log("Could not get data");
        return
    }
    setText(teamName + "_name", data.name)
    setImage(teamName + "_logo", data.icon)

    for (var i = 0; i < data.players.length; i++) {
        const player = data.players[i];

        setText(teamName + "_player_" + (i + 1), player.name);
        setImage(teamName + "_player_image_" + (i + 1), player.icon)
    }
}


function setText(id, value) {
    document.getElementById(id).innerHTML = value;
}

function setImage(id, value) {
    document.getElementById(id).setAttribute("style", `background-image:url('../logos/${value}');`);
}

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function getPath() {
    return window.location.protocol + "//" + window.location.host;
}

update();