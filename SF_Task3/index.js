var ta1 = 0;
var ta2 = 0;
var tb1 = 0;
var tb2 = 0;
var a = 0, aloc = 2;
var b = 0, bloc = 2;
var t = "A";
var aleft = 0, bleft = 0;

var tran = new sound("Track1.mp3");
var win = new sound("Track2.mp3");
var cap = new sound("Track3.mp3");
var err = new sound("Track4.mp3");

function flipPlayer(X) {
	if (X == "A") {
		document.getElementById("turn").innerHTML = "TURN: Player B";
		t = "B";
	}
	else if (X == "B") {
		document.getElementById("turn").innerHTML = "TURN: Player A";
		t = "A";
	}
}

function activateRoller() {
	document.getElementById("roll").style.cursor = "pointer";
	document.getElementById("roll").setAttribute("onClick", "roll()");
	document.getElementById("roll").style.opacity = "100%";
	$(".cheat").css("opacity", "100%");
	$(".cheat[onclick]").val("choose(" + $(this).text() +")");
	$(".cheat").css("cursor", "pointer");
}

function deactivateRoller() {
	document.getElementById("roll").style.cursor = "default";
	document.getElementById("roll").setAttribute("onClick", "");
	document.getElementById("roll").style.opacity = "0%";
	$(".cheat").css("opacity", "0%");
	$(".cheat[onclick]").val("");
	$(".cheat").css("cursor", "default");
}

function activateToken(X, x) {
	if (X == "A") {
		if ((ta1 != 0) && (ta1 < 29)) {
			document.getElementById("b"+String(ta1)).style.boxShadow = "0px 0px 20px yellow";
			//document.getElementById("b"+String(ta1)).style.background = "orange";
			document.getElementById("b"+String(ta1)).style.cursor = "pointer";
			document.getElementById("b"+String(ta1)).setAttribute("onClick", "move(ta1," + x + ")") ;
		}
		if ((ta2 != 0) && (ta2 < 29)) {
			document.getElementById("b"+String(ta2)).style.boxShadow = "0px 0px 20px yellow";
			//document.getElementById("b"+String(ta2)).style.background = "orange";
			document.getElementById("b"+String(ta2)).style.cursor = "pointer";
			document.getElementById("b"+String(ta2)).setAttribute("onClick", "move(ta2," + x + ")") ;
		}
	}
	else if (X == "B") {
		if ((tb1 != 0) && (tb1 < 29)) {
			document.getElementById("b"+String(tb1)).style.boxShadow = "0px 0px 20px yellow";
			//document.getElementById("b"+String(tb1)).style.background = "orange";
			document.getElementById("b"+String(tb1)).style.cursor = "pointer";
			document.getElementById("b"+String(tb1)).setAttribute("onClick", "move(tb1," + x + ")") ;
		}
		if ((tb2 != 0) && (tb2 < 29)) {
			document.getElementById("b"+String(tb2)).style.boxShadow = "0px 0px 20px yellow";
			//document.getElementById("b"+String(tb2)).style.background = "orange";
			document.getElementById("b"+String(tb2)).style.cursor = "pointer";
			document.getElementById("b"+String(tb2)).setAttribute("onClick", "move(tb2," + x + ")") ;
		}
	}
}

function deactivateToken(X) {
	if (X == "A") {
		if ((ta1 != 0) && (ta1 < 29)) {
			document.getElementById("b"+String(ta1)).style.boxShadow = "0px 0px 0px red";
			//document.getElementById("b"+String(ta1)).style.background = "white";
			document.getElementById("b"+String(ta1)).style.cursor = "default";
			document.getElementById("b"+String(ta1)).setAttribute("onClick", "") ;
		}
		if ((ta2 != 0) && (ta2 < 29)) {
			document.getElementById("b"+String(ta2)).style.boxShadow = "0px 0px 0px red";
			//document.getElementById("b"+String(ta2)).style.background = "white";
			document.getElementById("b"+String(ta2)).style.cursor = "default";
			document.getElementById("b"+String(ta2)).setAttribute("onClick", "") ;
		}
	}
	else if (X == "B") {
		if ((tb1 != 0) && (tb1 < 29)) {
			document.getElementById("b"+String(tb1)).style.boxShadow = "0px 0px 0px red";
			//document.getElementById("b"+String(tb1)).style.background = "white";
			document.getElementById("b"+String(tb1)).style.cursor = "default";
			document.getElementById("b"+String(tb1)).setAttribute("onClick", "") ;
		}
		if ((tb2 != 0) && (tb2 < 29)) {
			document.getElementById("b"+String(tb2)).style.boxShadow = "0px 0px 0px red";
			//document.getElementById("b"+String(tb2)).style.background = "white";
			document.getElementById("b"+String(tb2)).style.cursor = "default";
			document.getElementById("b"+String(tb2)).setAttribute("onClick", "") ;
		}
	}
}

function activateLocker(X) {
	document.getElementById(X).style.boxShadow = "0px 0px 20px yellow";
	document.getElementById(X).style.cursor = "pointer";
	document.getElementById(X).setAttribute("onClick", "unlock('" + X + "')") ;
}

function deactivateLocker(X) {
	document.getElementById(X).style.boxShadow = "0px 0px 0px red";
	document.getElementById(X).style.cursor = "default";
	document.getElementById(X).setAttribute("onClick", "") ;

}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
}

function refresh() {
	a = 0, aloc = 2;
	b = 0, bloc = 2;
	t = "A";
	aleft = 0, bleft = 0;
	document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div><div class='tokenA'></div></div>";
	document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div><div class='tokenB'></div></div>";
	document.getElementById("out").innerHTML = 0;
	document.getElementById("turn").innerHTML = "TURN: Player A";
	document.getElementById("success").innerHTML = "";
	if ((ta1 < 29) && (ta1 > 0)) {document.getElementById("b"+String(ta1)).innerHTML = "";}
	if ((ta2 < 29) && (ta2 > 0)) {document.getElementById("b"+String(ta2)).innerHTML = "";}
	if ((tb1 < 29) && (tb1 > 0)) {document.getElementById("b"+String(tb1)).innerHTML = "";}
	if ((tb2 < 29) && (tb2 > 0)) {document.getElementById("b"+String(tb2)).innerHTML = "";}
	ta1 = 0;
	ta2 = 0;
	tb1 = 0;
	tb2 = 0;
	activateRoller();
}

function mod(x) {
	if (x != 0) return 1000;
	else return 0;
}

function move(token, x) {
	deactivateToken(t);
	var dest;
	$("#b"+String(token)+" div").attr("id", "an");
	if (x + token <= 29) {
		if (token + x == 29) {dest = 1; win.play();}
		else {dest = token + x; tran.play();}
		var p = $("#b"+String(dest)).offset().left - $("#b"+String(token)).offset().left;
		var q = $("#b"+String(dest)).offset().top - $("#b"+String(token)).offset().top;
		var r = mod(p);
		var s = mod(q);
		if ((token < 9) || ((token > 14) && (token < 23))) {
			$("#an").animate( {
	        	left: p
	    	}, r, function() {});
	    	$("#an").animate( {
	        	top: q
	    	}, s, function() {aftermove(token, x);});
	    }
	    else {
	    	$("#an").animate( {
	        	top: q
	    	}, s, function() {});
	    	$("#an").animate( {
	        	left: p
	    	}, r, function() {aftermove(token, x);});
	    }
	}
	else aftermove(token, x);
}

function aftermove(token, x) {
	$("#b"+String(token)+" div").attr("id", "");
	var temp;
	if (t == "A")  {
		if (x + token <= 29) {
			if (ta1 == ta2) document.getElementById("b"+String(token)).innerHTML = "<div class='tokenA'></div>";
			else document.getElementById("b"+String(token)).innerHTML = "";
		}
		//deactivateToken("A");
		if (token + x <29) {
			//tran.play();
			if (token == ta1) {
				ta1 += x;
				temp = ta2;
			}
			else {
				ta2 += x;
				temp = ta1;
			}
			token += x;
			if (token == tb1) {
				cap.play();
				tb1 = 0;
				bloc++;
				b--;
				if(bloc == 1) document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div>";
				else document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div><div class='tokenB'></div>";
			}
			if (token == tb2) {
				cap.play();
				tb2 = 0;
				bloc++;
				b--;
				if(bloc == 1) document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div>";
				else document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div><div class='tokenB'></div>";
			}
			if (token == temp) document.getElementById("b"+String(token)).innerHTML = "<div class='tokenA'></div><div class='tokenA'></div>";
			else document.getElementById("b"+String(token)).innerHTML = "<div class='tokenA'></div>";
		}
		else if (token + x == 29) {
			//win.play();
			a--;
			//document.getElementById("b"+String(token)).innerHTML = "";
			/*if (tb1 == 28) {
				tb1 = 0;
				bloc++;
				b--;
				if(bloc == 1) document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div>";
				else document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div><div class='tokenB'></div>";
				document.getElementById("b28").innerHTML = "";
			}
			if (tb2 == 28) {
				tb2 = 0;
				bloc++;
				b--;
				if(bloc == 1) document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div>";
				else document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div><div class='tokenB'></div>";
				document.getElementById("b28").innerHTML = "";
			}*/
			if (token == ta1) ta1 = 29;
			else ta2 = 29;
			aleft++;
			document.getElementById("success").innerHTML = document.getElementById("success").innerHTML + "<div class='tokenA'></div>";
			$(document).ready(function(){
				if (aleft == 2) {
					alert("A won this match by " + String(b + bloc) + " token(s).");
					refresh();
					return;
				}
			});
		}
		else {
			err.play();
			alert("Sorry! you cannot move.\nTry next time.");
			if (x == 6) flipPlayer(t);
		}
		deactivateLocker("A");
	}
	else if (t == "B") {
		if (token + x <= 29) {
			if (tb1 == tb2) document.getElementById("b"+String(token)).innerHTML = "<div class='tokenB'></div>";
			else document.getElementById("b"+String(token)).innerHTML = "";
		}
		//deactivateToken("B");
		if (token + x > 29) {
			err.play();
			alert("Sorry! you cannot move.\nTry next time.");
			if (x == 6) flipPlayer(t);
		}
		else if (token + x == 29) {
			//win.play();
			b--;
			//document.getElementById("b"+String(token)).innerHTML = "";
			/*if (token + x == 28) {
				if (14 == ta1) {
					ta1 = 0;
					aloc++;
					a--;
					if(aloc == 1) document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div>";
					else document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div><div class='tokenA'></div>";
					document.getElementById("b14").innerHTML = "";
				}
				if (14 == ta2) {
					ta2 = 0;
					aloc++;
					a--;
					if(aloc == 1) document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div>";
					else document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div><div class='tokenA'></div>";
					document.getElementById("b14").innerHTML = "";
				}
			}*/
			if (token == tb1) tb1 = 29;
			else tb2 = 29;
			bleft++;
			//win.play();
			document.getElementById("success").innerHTML = document.getElementById("success").innerHTML + "<div class='tokenB'></div>";
			$(document).ready(function(){
				if (bleft == 2) {
					alert("B won this match by " + String(a + aloc) + " token(s).");
					refresh();
					return;
				}
			});
		}
		else {
			//tran.play();
			if (token == tb1) {
				tb1 += x;
				temp = tb2;
			}
			else {
				tb2 += x;
				temp = tb1;
			}
			token += x;
			if (token == ta1) {
				cap.play();
				ta1 = 0;
				aloc++;
				a--;
				if(aloc == 1) document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div>";
				else document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div><div class='tokenA'></div>";
			}
			if (token == ta2) {
				cap.play();
				ta2 = 0;
				aloc++;
				a--;
				if(aloc == 1) document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div>";
				else document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div><div class='tokenA'></div>";
			}
			if (token == temp) document.getElementById("b"+String(token)).innerHTML = "<div class='tokenB'></div><div class='tokenB'></div>";
			else document.getElementById("b"+String(token)).innerHTML = "<div class='tokenB'></div>";
		}
		deactivateLocker("B");
	}
	if ((x != 6) && (x != 0)) flipPlayer(t);
	activateRoller();
}

function unlock(X) {
	tran.play();
	if (X == "A") {
		a++;
		aloc--;
		if (ta1 == 0) { ta1 = 1; aftermove(ta1, 0); }
		else { ta2 = 1; aftermove(ta2, 0); }
		if(aloc == 1) document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div>";
		else document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenI'></div></div>";
		deactivateLocker("A");
		deactivateToken("A");
	}
	else if (X == "B") {
		b++;
		bloc--;
		if (tb1 == 0) { tb1 = 15; aftermove(tb1, 0); }
		else { tb2 = 15; aftermove(tb2, 0); }
		if(bloc == 1) document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div>";
		else document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenI'></div>";
		deactivateLocker("B");
		deactivateToken("B");
	}
	activateRoller();
}

function operate(x) {
	var ret, loc;
	if (t == "A") {ret = a; loc = aloc;}
	else if (t == "B") {ret = b; loc = bloc;}
	if (x != 6) {
		if (ret == 2) activateToken(t, x);
		else if (ret == 1) {
			if (t == 'A') {
				if ((ta1 != 0) && (ta1 < 29)) move(ta1, x);
				else move(ta2, x);
			}
			else {
				if ((tb1 != 0) && (tb1 < 29)) move(tb1, x);
				else move(tb2, x);
			}
		}
		else { 
			err.play();
			flipPlayer(t); 
			activateRoller();
		}
	}
	else {
		if (loc == 0) {
			if (ret == 1) {
				if (t == 'A') {
					if ((ta1 != 0) && (ta1 < 29)) move(ta1, x);
					else move(ta2, x);
				}
				else {
					if ((tb1 != 0) && (tb1 < 29)) move(tb1, x);
					else move(tb2, x);
				}
			}
			else activateToken(t, 6);
		}
		else if (ret == 0) {
			unlock(t);
		}
		else {
			activateToken(t, 6);
			activateLocker(t);
		}
	}
}

function choose(x) {
	document.getElementById("out").innerHTML = x;
	deactivateRoller();
	operate(x);
}

function roll() {
        deactivateRoller();
	var x;
	var res = document.getElementById("out");
	var i = 0;
	var anim = setInterval(frame, 50);
	function frame() {
		if (i == 10) {
			operate(x);
			clearInterval(anim);
		}
		else {
			i++;
			x = Math.floor(Math.random() * 6) + 1;
			document.getElementById("out").innerHTML = x;
		}
	}

}

