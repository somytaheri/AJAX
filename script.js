window.onload = initAll;
var xhr = false;
var xPos;
var yPos;

function initAll(){
	var allLink = document.getElementsByTagName("a");
	for (var i=0; i<allLink.length; i++) {
		allLink[i].onmouseover = showPreview;
	}
}

function showPreview(evt) {
	if (evt) {
		var url = evt.target;
	}
	xPos = evt.clientX;
	yPos = evt.clientY;

	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	else {
		if (xhr.ActiveXObject) {
			try {
				xhr =new ActiveXObject("Microsoft.XMLHTTP")
			}
			catch (e) {}
		}
	}

	if (xhr) {
		xhr.onreadystatechange = showContents;
		xhr.open("get", url , "true");
		xhr.send(null);
	}
	else {
		alert("Sorry, but I couldn't create an XMLHttpRequest")
	}
	return false
}

function showContents() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			var outMsg = xhr.responseText;
		}
		else {
			var outMsg = "There was a problem with the request" + xhr.status;
		}
	}
	var prevWin = document.getElementById("previewWin");
		prevWin.innerHTML = outMsg;
		prevWin.style.top = parseInt(yPos) + 2 + "px";
		prevWin.style.left = parseInt(xPos) + 2 + "px";
		prevWin.style.visibility = "visible";
		prevWin.onmouseout = function() {
		document.getElementById("previewWin").style.visibility = "hidden";
	}
}
