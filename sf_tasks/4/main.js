function shpass(id) {
  var x = document.getElementById(id);
  if (x.type == "password") x.type = "text";
  else x.type = "password";
}

function openAddTopic() {
  document.getElementById("modal").style.display = "block";
  document.getElementById("addTopic").style.display = "block";
  document.getElementById("add").style.display = "none";
}

function discard() {
  document.getElementById("topic").value = "";
  document.getElementById("addTopic").style.display = "none";
  document.getElementById("modal").style.display = "none";
  document.getElementById("add").style.display = "block";
}

function addTopic() {
    document.getElementById("addTopic").style.display = "none";
    document.getElementById("modal").style.display = "none";
    var topic = document.getElementById("topic").value;
    document.getElementById("topic").value = "";
    document.getElementById("add").style.display = "block";
    //alert(topic.length);
    if (topic.length > 500) 
    {
      alert("More than 500 characters are not allowed.");
      return;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("showTopics").innerHTML = this.responseText + document.getElementById("showTopics").innerHTML;
      }
    };
    xmlhttp.open("GET","hidden.php?m=1&t="+topic,true);
    xmlhttp.send();
}

function delTopic(n, id) {
  if(confirm("Are you sure to delete topic-"+String(n)+"?")) {
    document.getElementById("t"+String(n)).style.display = "none";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","hidden.php?m=2&id="+id,true);
    xmlhttp.send();
  }
}

function upvote(id) {
  var xmlhttp = new XMLHttpRequest();
  var x = document.getElementById("uv"+String(id));
  var y = document.getElementById("dv"+String(id));
  var nu = Number(x.innerHTML.substring(1, x.innerHTML.length-1));
  var nd = Number(y.innerHTML.substring(1, y.innerHTML.length-1));
  if (!x.classList.contains("fa-thumbs-up")) {
    x.classList.remove("fa-thumbs-o-up");
    x.classList.add("fa-thumbs-up");
    x.innerHTML = "(" + String(nu+1) + ")";
    xmlhttp.open("GET","hidden.php?m=3&id="+id,true);
    xmlhttp.send();
    if (y.classList.contains("fa-thumbs-down")) { 
      y.classList.remove("fa-thumbs-down");
      y.classList.add("fa-thumbs-o-down");
      y.innerHTML = "(" + String(nd-1) + ")";
    }
  }
  else {
    x.classList.remove("fa-thumbs-up");
    x.classList.add("fa-thumbs-o-up");
    x.innerHTML = "(" + String(nu-1) + ")";
    xmlhttp.open("GET","hidden.php?m=5&id="+id,true);
    xmlhttp.send();
  }
}

function downvote(id) {
  var xmlhttp = new XMLHttpRequest();
  var y = document.getElementById("uv"+String(id));
  var x = document.getElementById("dv"+String(id));
  var nu = Number(y.innerHTML.substring(1, y.innerHTML.length-1));
  var nd = Number(x.innerHTML.substring(1, x.innerHTML.length-1));
  if (!x.classList.contains("fa-thumbs-down")) {
    x.classList.remove("fa-thumbs-o-down");
    x.classList.add("fa-thumbs-down");
    x.innerHTML = "(" + String(nd+1) + ")";
    xmlhttp.open("GET","hidden.php?m=4&id="+id,true);
    xmlhttp.send();
    if (y.classList.contains("fa-thumbs-up")) {
      y.classList.remove("fa-thumbs-up");
      y.classList.add("fa-thumbs-o-up");
      y.innerHTML = "(" + String(nu-1) + ")";
    }
  }
  else {
    x.classList.remove("fa-thumbs-down");
    x.classList.add("fa-thumbs-o-down");
    x.innerHTML = "(" + String(nd-1) + ")";
    xmlhttp.open("GET","hidden.php?m=5&id="+id,true);
    xmlhttp.send();
  }
}

function comments(id) {
  var x = document.getElementById("c"+String(id));
  var y = document.getElementById("cs"+String(id));
  if (x.style.display == "block") {
    x.style.display = "none";
    y.classList.remove("vote");
  }
  else {
    x.style.display = "block";
    y.classList.add("vote");
  }
}

function addComment(id) {
  var comment = document.getElementById("ca"+String(id)).value;
  document.getElementById("ca"+String(id)).value = "";
  if (comment.length > 200) 
    {
      alert("More than 200 characters are not allowed.");
      return;
    }
  var y = document.getElementById("cs"+String(id));
  var nc = Number(y.value.substring(9, y.value.length-1));
  y.value = "Comments(" + String(nc+1) + ")";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("c"+String(id)).innerHTML = this.responseText + document.getElementById("c"+String(id)).innerHTML;
    }
  };
  xmlhttp.open("GET","hidden.php?m=6&c="+comment+"&id="+String(id),true);
  xmlhttp.send();
}

function delComment(cid, id) {
  if(confirm("Are you sure to delete the comment?")) {
    var y = document.getElementById("cs"+String(id));
    var nc = Number(y.value.substring(9, y.value.length-1));
    y.value = "Comments(" + String(nc-1) + ")";
    document.getElementById("cm"+String(cid)).style.display = "none";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","hidden.php?m=7&cid="+cid,true);
    xmlhttp.send();
  }
}

function upvotecomment(cid, id) {
  var xmlhttp = new XMLHttpRequest();
  var x = document.getElementById("uvc"+String(cid));
  var y = document.getElementById("dvc"+String(cid));
  var nu = Number(x.innerHTML.substring(1, x.innerHTML.length-1));
  var nd = Number(y.innerHTML.substring(1, y.innerHTML.length-1));
  if (!x.classList.contains("fa-thumbs-up")) {
    x.classList.remove("fa-thumbs-o-up");
    x.classList.add("fa-thumbs-up");
    x.innerHTML = "(" + String(nu+1) + ")";
    xmlhttp.open("GET","hidden.php?m=8&cid="+cid+"&id="+id,true);
    xmlhttp.send();
    if (y.classList.contains("fa-thumbs-down")) { 
      y.classList.remove("fa-thumbs-down");
      y.classList.add("fa-thumbs-o-down");
      y.innerHTML = "(" + String(nd-1) + ")";
    }
  }
  else {
    x.classList.remove("fa-thumbs-up");
    x.classList.add("fa-thumbs-o-up");
    x.innerHTML = "(" + String(nu-1) + ")";
    xmlhttp.open("GET","hidden.php?m=10&cid="+cid+"&id="+id,true);
    xmlhttp.send();
  }
}

function downvotecomment(cid, id) {
  var xmlhttp = new XMLHttpRequest();
  var y = document.getElementById("uvc"+String(cid));
  var x = document.getElementById("dvc"+String(cid));
  var nu = Number(y.innerHTML.substring(1, y.innerHTML.length-1));
  var nd = Number(x.innerHTML.substring(1, x.innerHTML.length-1));
  if (!x.classList.contains("fa-thumbs-down")) {
    x.classList.remove("fa-thumbs-o-down");
    x.classList.add("fa-thumbs-down");
    x.innerHTML = "(" + String(nd+1) + ")";
    xmlhttp.open("GET","hidden.php?m=9&cid="+cid+"&id="+id,true);
    xmlhttp.send();
    if (y.classList.contains("fa-thumbs-up")) {
      y.classList.remove("fa-thumbs-up");
      y.classList.add("fa-thumbs-o-up");
      y.innerHTML = "(" + String(nu-1) + ")";
    }
  }
  else {
    x.classList.remove("fa-thumbs-down");
    x.classList.add("fa-thumbs-o-down");
    x.innerHTML = "(" + String(nd-1) + ")";
    xmlhttp.open("GET","hidden.php?m=10&cid="+cid+"&id="+id,true);
    xmlhttp.send();
  }
}