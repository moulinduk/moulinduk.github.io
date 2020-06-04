var ta1 = 0;
var ta2 = 0;
var tb1 = 0;
var tb2 = 0;
var a = 0, aloc = 2;
var b = 0, bloc = 2;
var t = "A";
var aleft = 0, bleft = 0;

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

function move(token, x) {
	var temp;
	if (t == "A")  {
		if (ta1 == ta2) document.getElementById("b"+String(token)).innerHTML = "<div class='tokenA'></div>";
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
				if(bloc == 1) document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div>";
				else document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div><div class='tokenB'></div>";
			}
			if (token == tb2) {
				tb2 = 0;
				bloc++;
				b--;
				if(bloc == 1) document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div>";
				else document.getElementById("B").innerHTML = "Locker for B <br><div class='tokenB'></div><div class='tokenB'></div>";
			}
			if (token == temp) document.getElementById("b"+String(token)).innerHTML = "<div class='tokenA'></div><div class='tokenA'></div>";
			else document.getElementById("b"+String(token)).innerHTML = "<div class='tokenA'></div>";
		}
		else if (token + x >= 28) {
			a--;
			document.getElementById("b"+String(token)).innerHTML = "";
			if (token + x == 28) {
				if (tb1 == 28) {
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
				}
			}
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
		deactivateLocker("A");
	}
	else if (t == "B") {
		if (tb1 == tb2) document.getElementById("b"+String(token)).innerHTML = "<div class='tokenB'></div>";
		else document.getElementById("b"+String(token)).innerHTML = "";
		deactivateToken("B");
		if ((token < 14) && (token + x >= 14)) {
			b--;
			document.getElementById("b"+String(token)).innerHTML = "";
			if (token + x == 14) {
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
			}
			if (token == tb1) tb1 = 29;
			else tb2 = 29;
			bleft++;
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
				if(aloc == 1) document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div>";
				else document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div><div class='tokenA'></div>";
			}
			if (token == ta2) {
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
	if (X == "A") {
		a++;
		aloc--;
		if (ta1 == 0) { ta1 = 1; move(ta1, 0); }
		else { ta2 = 1; move(ta2, 0); }
		if(aloc == 1) document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenA'></div>";
		else document.getElementById("A").innerHTML = "Locker for A <br><div class='tokenI'></div></div>";
		deactivateLocker("A");
		deactivateToken("A");
	}
	else if (X == "B") {
		b++;
		bloc--;
		if (tb1 == 0) { tb1 = 15; move(tb1, 0); }
		else { tb2 = 15; move(tb2, 0); }
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

function choose(x) {
	document.getElementById("out").innerHTML = x;
	deactivateRoller();
	operate(x);
}

function roll() {
	var x;
	var res = document.getElementById("out");
	var i = 0;
	var anim = setInterval(frame, 50);
	function frame() {
		if (i == 10) {
			deactivateRoller();
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

