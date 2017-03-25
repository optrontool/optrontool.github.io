const OptronServerLoc = "https://optron.herokuapp.com/job";

var g_http = null;

var g_ucf = null;

var g_verilog = null;

function onSubmitPressed() {
    var unameField = document.getElementById("cello-username");
    var passwdField = document.getElementById("cello-password");
    if (unameField.value == "" || passwdField == "" || !g_ucf || !g_verilog) {
	// FIXME: make this better, e.g. highlight the missing fields...
	window.alert("Missing field!");
	return;
    }
    if (document.getElementById("submit-button").disabled == true) {
	window.alert("Please wait...");
	return;
    }
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
	password: document.getElementById("cello-password").value,
	ucf: g_ucf,
	verilog: g_verilog
    }));
}

if (!window.FileReader) {
    window.alert("Your browser is not compatible with Optron ;-(");
}

function handleUCFUpload(evt) {
    var f = evt.target.files[0]; 
    if (f) {
	var r = new FileReader();
	r.onload = function(e) { 
	    g_ucf = e.target.result;
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
