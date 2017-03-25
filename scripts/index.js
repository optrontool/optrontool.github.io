const OptronServerLoc = "https://optron.herokuapp.com/job";

var g_http = null;

function onSubmitPressed() {
    document.getElementById("submit-button").disabled = true;
    g_http = new XMLHttpRequest();
    g_http.open("POST", OptronServerLoc, true);
    g_http.setRequestHeader("Content-type", "application/json");
    g_http.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
            alert(g_http.responseText);
	}
	document.getElementById("submit-button").disabled = false;
    }
    g_http.send(JSON.stringify({
	name: document.getElementById("cello-username").value,
	password: document.getElementById("cello-password").value
    }));
}
