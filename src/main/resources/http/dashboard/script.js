var currentSelectedPlayer = undefined;

document.addEventListener('click', function (event) {
	var currentID = event.target.id || "No ID!";
	console.log('ID: ' + currentID);
	if (currentSelectedPlayer != undefined && currentID.includes("character_")) {
		document.getElementById(currentSelectedPlayer).setAttribute("style", `background-image:url('img/${currentID.replace("character_","")}.png');`);
		choosingCharacter(undefined);
	} else {
		choosingCharacter(undefined);
	}
	if (currentID.includes("_player_image_")) {
		choosingCharacter(currentID);
	}
	if (currentID == "set") {
		submitData()
	}
	if (currentID == "swap") {
		swapAll()
	}
});

function choosingCharacter(playerlogoID) {	
	currentSelectedPlayer = playerlogoID;
	if (playerlogoID != undefined) {
		document.getElementById(playerlogoID).classList.add("selected");
	} else {
		var selectedElements = document.getElementsByClassName("selected");
		Array.from(selectedElements).forEach(element => {
			element.classList.remove("selected");
		});
	}
};

function submitData() {
	var data = {
		team1 : {
			name : document.getElementById("team1_name").value,
			icon : document.getElementById("team1_logo").value,
			players : []
		},
		team2 : {
			name : document.getElementById("team2_name").value,
			icon : document.getElementById("team2_logo").value,
			players : []
		}
	}
	for (let i = 0; i < 5; i++) {
		var team1Player = {
			name : document.getElementById("team1_player_" + (i+1)).value,
			icon : getImageFromId("team1_player_image_" + (i+1)),
		}
		data.team1.players.push(team1Player);

		var team2Player = {
			name : document.getElementById("team2_player_" + (i+1)).value,
			icon : getImageFromId("team2_player_image_" + (i+1)),
		}
		data.team2.players.push(team2Player);
	}
	var json = JSON.stringify(data);
	postJSON(getPath() + '/api/123', json, (err, data) => {
        if (err !== null || data === null) {
            console.log('Something went wrong: ' + err);
        } else {
            console.log(data);
		}
	});

}

function getImageFromId(id) {
	var regex = "(?<=\/)(.*)(?=.png)";
	var style = document.getElementById(id).getAttribute("style");
	if (!style){
		return "Breach";
	}
	var match = style.match(regex);
	return match[0];
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

var postJSON = function (url, data ,callback) {
    var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send(data);
};

function getPath() {
    return window.location.protocol + "//" + window.location.host;
}

function swap(type) {
	var old1 = document.getElementById("team1_" + type).value;
	var old2 = document.getElementById("team2_" + type).value;
	document.getElementById("team2_" + type).value = old1;
	document.getElementById("team1_" + type).value = old2;
}

function swapImage(player) {
	var old1 = document.getElementById("team1_player_image_" + player).getAttribute("style");
	var old2 = document.getElementById("team2_player_image_" + player).getAttribute("style");
	document.getElementById("team2_player_image_" + player).setAttribute("style", old1);
	document.getElementById("team1_player_image_" + player).setAttribute("style", old2);
}

function swapAll() {
	swap("name");
	swap("logo");
	for (let i = 0; i < 5; i++) {
		swap("player_" + (i+1));
		swapImage(i+1);
	}

}