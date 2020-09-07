// function update() {
// 	getJSON(getPath() + "/api/123", (err, data) => {
// 		if (err !== null || data === null) {
// 			console.log("Something went wrong: " + err);
// 		} else {
// 			console.log(data);
// 			setHalf(data.half);
// 			updateTeamData("team1", data.team1);
// 			updateTeamData("team2", data.team2);
// 			setTimeout(update, 1000);
// 		}
// 	});
// }

const teamdataRep = nodecg.Replicant("teamdataRep" /*, { defaultValue: ""}*/);

// nodecg.listenFor("updatePlayers", (data) => {
// 	setHalf(data.half);
// 	updateTeamData("team1", data.team1);
// 	updateTeamData("team2", data.team2);
// });

teamdataRep.on("change", (newValue, oldValue) => {
	setHalf(newValue.half);
	updateTeamData("team1", newValue.team1);
	updateTeamData("team2", newValue.team2);
	nodecg.log.info(`team1Rep changed from ${oldValue} to ${newValue}`);
});

function updateTeamData(teamName, data) {
	if (!data) {
		console.log("Could not get data");
		return;
	}
	for (var i = 0; i < data.players.length; i++) {
		const player = data.players[i];

		setText(teamName + "_player_" + (i + 1), player.name);
		setImage(teamName + "_player_image_" + (i + 1), player.icon);
	}
}

function setText(id, value) {
	document.getElementById(id).innerHTML = value;
}

function setImage(id, value) {
	if (id.includes("_player_image_")) {
		document
			.getElementById(id)
			.setAttribute(
				"style",
				`background-image:url('../img/48px/${value}.png');`
			);
	}
}

function setVideo(id, value) {
	if (id.includes("-video")) {
		document
			.getElementById(id)
			.setAttribute("src", `../mp4/ingame_${value}_animation.mp4`);
	}
}

function setHalf(value) {
	if (value == 0) {
		setVideo("left-video", "blue");
		setVideo("right-video", "red");
		document
			.getElementById("bottom_right_box")
			.classList.remove("attack-color");
		document
			.getElementById("bottom_right_box")
			.classList.remove("defender-color");
		document
			.getElementById("bottom_left_box")
			.classList.remove("attack-color");
		document
			.getElementById("bottom_left_box")
			.classList.remove("defender-color");
		document
			.getElementById("bottom_left_box")
			.classList.add("defender-color");
		document
			.getElementById("bottom_right_box")
			.classList.add("attack-color");
	}
	if (value == 1) {
		setVideo("left-video", "red");
		setVideo("right-video", "blue");
		document
			.getElementById("bottom_right_box")
			.classList.remove("attack-color");
		document
			.getElementById("bottom_right_box")
			.classList.remove("defender-color");
		document
			.getElementById("bottom_left_box")
			.classList.remove("attack-color");
		document
			.getElementById("bottom_left_box")
			.classList.remove("defender-color");
		document
			.getElementById("bottom_left_box")
			.classList.add("attack-color");
		document
			.getElementById("bottom_right_box")
			.classList.add("defender-color");
	}
}

// var getJSON = function (url, callback) {
// 	var xhr = new XMLHttpRequest();
// 	xhr.open("GET", url, true);
// 	xhr.responseType = "json";
// 	xhr.onload = function () {
// 		var status = xhr.status;
// 		if (status === 200) {
// 			callback(null, xhr.response);
// 		} else {
// 			callback(status, xhr.response);
// 		}
// 	};
// 	xhr.send();
// };

// function getPath() {
// 	return window.location.protocol + "//" + window.location.host;
// }

// update();
