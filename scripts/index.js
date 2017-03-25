const OptronServerLoc = "https://optron.herokuapp.com/job";

var g_http = null;

var g_ucf = null;

var g_verilog = null;

var g_result_ucf = null;

if (!window.FileReader) {
    window.alert("Sorry, your browser is not compatible with Optron ;-(");
    throw 42;
}

function onSubmitPressed() {
    var unameField = document.getElementById("cello-username");
    var passwdField = document.getElementById("cello-password");
    if (unameField.value == "" || passwdField == "" || !g_ucf || !g_verilog) {
	// FIXME: make this better, e.g. highlight the missing fields...
	window.alert("Missing field!");
	return;
    }
    document.getElementById("submit-button").style.display = "none";
    document.getElementById("loader").style.display = "";
    g_http = new XMLHttpRequest();
    g_http.open("POST", OptronServerLoc, true);
    g_http.setRequestHeader("Content-type", "application/json");
    g_http.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    resultsJSON = JSON.parse(g_http.responseText);
	    if (resultsJSON.hasOwnProperty("Error")) {
		document.getElementById("modal-msg").innerHTML = resultsJSON["Error"];
		document.getElementById("modalBtn").click();
	    } else {
		document.getElementById("modal-msg").innerHTML =
		    "Initial score: " + resultsJSON["initial_score"] + "<br>" +
		    "Optimized score: " + resultsJSON["optimized_score"];
		document.getElementById("modalBtn").click();
		g_result_ucf = resultsJSON["ucf"];
	    }
	}
	document.getElementById("submit-button").style.display = "";
	document.getElementById("loader").style.display = "none";
    }
    g_http.send(JSON.stringify({
	name: document.getElementById("cello-username").value,
	password: document.getElementById("cello-password").value,
	jobid: document.getElementById("jobid").value,
	ucf: g_ucf,
	verilog: g_verilog
    }));
}

document.getElementById("loader").style.display = "none";

function handleUCFUpload(evt) {
    var f = evt.target.files[0]; 
    if (f) {
	var r = new FileReader();
	r.onload = function(e) {
	    try {
		g_ucf = e.target.result;
	    } catch(err) {
		window.alert(err);
		return;
	    }
	}
	r.readAsText(f);
    }
}

function handleVerilogUpload(evt) {
    var f = evt.target.files[0];
    if (f) {
	var r = new FileReader();
	r.onload = function(e) {
	    g_verilog = e.target.result;
	}
	r.readAsText(f);
    }
}

document.getElementById("ucf-selector").addEventListener("change", handleUCFUpload, false);

document.getElementById("verilog-selector").addEventListener("change", handleVerilogUpload, false);

function onDownloadUCFPressed() {
    if (g_result_ucf) {
	var wnd = window.open("about:blank", "", "_blank");
	wnd.document.write(g_result_ucf);
    }
}

var modal = document.getElementById('modal');

var btn = document.getElementById("modalBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function onHomePressed() {
    window.location.href = "index.html";
}

function onAboutPressed() {
    window.location.href = "about.html";
}
