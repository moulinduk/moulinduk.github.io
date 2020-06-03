var ta1 = 0;
var ta2 = 0;
var tb1 = 0;
var tb2 = 0;
var a = 0, aloc = 2;
var b = 0, bloc = 2;
var t = "A";
var aleft = 0, bleft = 0;

function inLocker(pl) {
	var x = document.getElementById(pl).innerHTML;
	var ret = Number(x[22]);
	return ret;
}

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
	document.getElementById("roll").style.color = "yellow";
	document.getElementById("roll").style.textShadow = "0px 0px 10px black";
}

function deactivateRoller() {
	document.getElementById("roll").style.cursor = "default";
	document.getElementById("roll").setAttribute("onClick", "");
	document.getElementById("roll").style.color = "#e8e4d8";
	document.getElementById("roll").style.textShadow = "0px 0px 0px #e8e4d8";
}

function activateToken(X, x) {
	if (X == "A") {
		if ((ta1 != 0) && (ta1 < 29)) {
			document.getElementById("b"+String(ta1)).style.boxShadow = "0px 0px 20px red";
			//document.getElementById("b"+String(ta1)).style.background = "orange";
			document.getElementById("b"+String(ta1)).style.cursor = "pointer";
			document.getElementById("b"+String(ta1)).setAttribute("onClick", "move(ta1," + x + ")") ;
		}
		if ((ta2 != 0) && (ta2 < 29)) {
			document.getElementById("b"+String(ta2)).style.boxShadow = "0px 0px 20px red";
			//document.getElementById("b"+String(ta2)).style.background = "orange";
			document.getElementById("b"+String(ta2)).style.cursor = "pointer";
			document.getElementById("b"+String(ta2)).setAttribute("onClick", "move(ta2," + x + ")") ;
		}
	}
	else if (X == "B") {
		if ((tb1 != 0) && (tb1 < 29)) {
			document.getElementById("b"+String(tb1)).style.boxShadow = "0px 0px 20px red";
			//document.getElementById("b"+String(tb1)).style.background = "orange";
			document.getElementById("b"+String(tb1)).style.cursor = "pointer";
			document.getElementById("b"+String(tb1)).setAttribute("onClick", "move(tb1," + x + ")") ;
		}
		if ((tb2 != 0) && (tb2 < 29)) {
			document.getElementById("b"+String(tb2)).style.boxShadow = "0px 0px 20px red";
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
	document.getElementById(X).style.boxShadow = "0px 0px 20px red";
	document.getElementById(X).style.cursor = "pointer";
	document.getElementById(X).setAttribute("onClick", "unlock('" + X + "')") ;
}

function deactivateLocker(X) {
	document.getElementById(X).style.boxShadow = "0px 0px 0px red";
	document.getElementById(X).style.cursor = "default";
	document.getElementById(X).setAttribute("onClick", "") ;

}

function refresh() {
	a = 0, aloc = 2;
	b = 0, bloc = 2;
	t = "A";
	aleft = 0, bleft = 0;
	document.getElementById("A").innerHTML = "Locker for A <br> <b> 2 A </b></div>";
	document.getElementById("B").innerHTML = "Locker for B <br> <b> 2 B </b></div>";
	document.getElementById("out").innerHTML = 0;
	document.getElementById("turn").innerHTML = "TURN: Player A";
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

function move(token, x) {
	var temp;
	if (t == "A")  {
		if (ta1 == ta2) document.getElementById("b"+String(token)).innerHTML = "1A";
		else document.getElementById("b"+String(token)).innerHTML = "";
		deactivateToken("A");
		if (token + x <28) {
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
				tb1 = 0;
				bloc++;
				b--;
				document.getElementById("B").innerHTML = "Locker for B <br> <b> " + String(bloc) + " B </b></div>";
			}
			if (token == tb2) {
				tb2 = 0;
				bloc++;
				b--;
				document.getElementById("B").innerHTML = "Locker for B <br> <b> " + String(bloc) + " B </b></div>";
			}
			if (token == temp) document.getElementById("b"+String(token)).innerHTML = "2A";
			else document.getElementById("b"+String(token)).innerHTML = "1A";
		}
		else if (token + x >= 28) {
			a--;
			if (token == ta1) ta1 = 29;
			else ta2 = 29;
			aleft++;
			if (aleft == 2) {
				alert("A won this match by " + String(b + bloc) + " token(s).");
				refresh();
				return;
			}
		}
		deactivateLocker("A");
	}
	else if (t == "B") {
		if (tb1 == tb2) document.getElementById("b"+String(token)).innerHTML = "1B";
		else document.getElementById("b"+String(token)).innerHTML = "";
		deactivateToken("B");
		if ((token < 14) && (token + x >= 14)) {
			b--;
			if (token == tb1) tb1 = 29;
			else tb2 = 29;
			bleft++;
			if (bleft == 2) {
				alert("B won this match by " + String(a + aloc) + " token(s).");
				refresh();
				return;
			}
		}
		else {
			if (token == tb1) {
				if (tb1 + x <= 28) {tb1 += x; token += x;}
				else {tb1 += x - 28; token += x - 28;}
				temp = tb2;
			}
			else {
				if (tb2 + x <= 28) {tb2 += x; token += x;}
				else {tb2 += x - 28; token += x - 28;}
				temp = tb1;
			}
			if (token == ta1) {
				ta1 = 0;
				aloc++;
				a--;
				document.getElementById("A").innerHTML = "Locker for A <br> <b> " + String(aloc) + " A </b></div>";
			}
			if (token == ta2) {
				ta2 = 0;
				aloc++;
				a--;
				document.getElementById("A").innerHTML = "Locker for A <br> <b> " + String(aloc) + " A </b></div>";
			}
			if (token == temp) document.getElementById("b"+String(token)).innerHTML = "2B";
			else document.getElementById("b"+String(token)).innerHTML = "1B";
		}
		deactivateLocker("B");
	}
	if ((x != 6) && (x != 0)) flipPlayer(t);
	activateRoller();
}

function unlock(X) {
	if (X == "A") {
		a++;
		aloc--;
		if (ta1 == 0) { ta1 = 1; move(ta1, 0); }
		else { ta2 = 1; move(ta2, 0); }
		document.getElementById("A").innerHTML = "Locker for A <br> <b> " + String(aloc) + " A </b></div>";
		deactivateLocker("A");
		deactivateToken("A");
	}
	else if (X == "B") {
		b++;
		bloc--;
		if (tb1 == 0) { tb1 = 15; move(tb1, 0); }
		else { tb2 = 15; move(tb2, 0); }
		document.getElementById("B").innerHTML = "Locker for B <br> <b> " + String(bloc) + " B </b></div>";
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
		if (ret != 0) activateToken(t, x);
		else { flipPlayer(t); activateRoller();}
	}
	else {
		if (loc == 0) {
			activateToken(t, 6);
		}
		else if (ret == 0) {
			activateLocker(t);
		}
		else {
			activateToken(t, 6);
			activateLocker(t);
		}
	}
}

function roll() {
	var x = Math.floor(Math.random() * 6) + 1;
	document.getElementById("out").innerHTML = x;
	deactivateRoller();
	operate(x);
}

function check(key) {
	document.getElementById(key).style.boxShadow = "0px 0px 20px rgb(254,127,0)";
	var x = key.split("b");
	var y = "b"+String(Number(x[1])+1)
	document.getElementById(y).style.cursor = "pointer";
	document.getElementById(y).setAttribute( "onClick", "check('"+y+"')" );
}