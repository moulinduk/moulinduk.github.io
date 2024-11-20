<?php
require "connect.php";
$user_id = $_SESSION['user_id'];
$query = "SELECT * FROM `users` WHERE `ID`='$user_id'";
if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
$rows = mysqli_num_rows($qrun);
if ($rows == 0)
{
    die("Some error occured.");
}
else if ($rows == 1)
{
    $user = mysqli_fetch_assoc($qrun);
    $fname = $user['FirstName'];
    $lname = $user['LastName'];
}

// user_id : User ID of current user
// id : Topic ID
// cid : Comment ID
// tuid : User ID of the topic creater
// uid : Iterator for the topic creater and comment creater
// cuid : User ID of the comment creater

// selecting all topics
$query = "SELECT * FROM `topics`";  //WHERE `UserID`='$user_id'
if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));

$add = "";
$tc = 0;
// iterating through all topics
while ($tps = mysqli_fetch_assoc($qrun))
{
  $id = $tps['ID'];
  $tuid = $tps['UserID'];

  // for the upvotes of the topic
  $query = "SELECT * FROM `uvtopics` WHERE `TopicID`='$id'";
  if (!($qrun2 = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
  $tuv = mysqli_num_rows($qrun2);

  // for the downvotes of the topic
  $query = "SELECT * FROM `dvtopics` WHERE `TopicID`='$id'";
  if (!($qrun2 = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
  $tdv = mysqli_num_rows($qrun2);

  // for the comments of the topic
  $query = "SELECT * FROM `comments` WHERE `TopicID`='$id'";
  if (!($qrun7 = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
  $nc =  mysqli_num_rows($qrun7);

  // for the creater of the topic
  $query = "SELECT * FROM `users` WHERE `ID`='$tuid'";
  if (!($qrun3 = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
  $uid = mysqli_fetch_assoc($qrun3);
  $tc++;
  $str = "\n
  <div class='topic' id='t".$tc."'>
    <h2>".$uid['FirstName']." ".$uid['LastName']."</h2>
    <br><p>".$tps['Topic']."</p><br>
    <i aria-hidden=\"true\"";

  // checking whether the current user has upvoted the topic or not
  $query = "SELECT * FROM `uvtopics` WHERE `TopicID`='$id' AND `UserID`='$user_id'";
  if (!$qrun5 = mysqli_query($linkSQL, $query)) die(mysqli_error($linkSQL));
  if (mysqli_num_rows($qrun5) == 1) $str .= "class='fa fa-thumbs-up button2'";
  else $str .= "class='fa fa-thumbs-o-up button2'";

  $str .= " id='uv".$id."' onclick='upvote(".$id.")'>($tuv)</i>
      <i aria-hidden=\"true\"";

  // checking whether the current user has downvoted the topic or not
  $query = "SELECT * FROM `dvtopics` WHERE `TopicID`='$id' AND `UserID`='$user_id'";
  if (!$qrun6 = mysqli_query($linkSQL, $query)) die(mysqli_error($linkSQL));
  if (mysqli_num_rows($qrun6) == 1) $str .= "class='fa fa-thumbs-down button2'";
  else $str .= "class='fa fa-thumbs-o-down button2'";

  $str .= " id='dv".$id."' onclick='downvote(".$id.")'>($tdv)</i>
    <input type='submit' value='Comments($nc)' class='button2 button3' onclick='comments(".$id.")' id='cs$id'>";
  
  // checking whether the topic belong to the current user or not
  if ($tuid == $user_id) $str .= "<input type='submit' value='Delete' class='button2 button3' onclick='delTopic(".$tc.", ".$id.")'>";
  
  $str .= "<div class='comments' id='c".$id."'>";
  $com = "";
  while ($cs = mysqli_fetch_assoc($qrun7))
  {
    $cuid = $cs['UserID'];
    $cid = $cs['ID'];
    $query = "SELECT * FROM `users` WHERE `ID`='$cuid'";
    if (!($qrun4 = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
    $uid = mysqli_fetch_assoc($qrun4);

    // for the upvotes of the topic
    $query = "SELECT * FROM `uvcomments` WHERE `CommentID`='$cid'";
    if (!($qrun2 = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
    $cuv = mysqli_num_rows($qrun2);

    // for the downvotes of the topic
    $query = "SELECT * FROM `dvcomments` WHERE `CommentID`='$cid'";
    if (!($qrun2 = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
    $cdv = mysqli_num_rows($qrun2);

    $str1 = "";
    $str1 .= "<div class='li' id='cm$cid'>
      <h4>".$uid['FirstName']." ".$uid['LastName']."</h4>
      ".$cs['Comment']."<br><br>
      <div class='radio'><i aria-hidden=\"true\""; //<input type='submit' value='Upvote($cuv)' ";

    // checking whether the current user has upvoted the comment or not
    $query = "SELECT * FROM `uvcomments` WHERE `CommentID`='$cid' AND `UserID`='$user_id'";
    if (!$qrun5 = mysqli_query($linkSQL, $query)) die(mysqli_error($linkSQL));
    if (mysqli_num_rows($qrun5) == 1) $str1 .= "class='fa fa-thumbs-up button2'";
    else $str1 .= "class='fa fa-thumbs-o-up button2'";

    $str1 .= " id='uvc".$cid."' onclick='upvotecomment($cid, $id)'>($cuv)</i>
      <i aria-hidden=\"true\"";//<input type='submit' value='Downvote($cdv)' ";

    // checking whether the current user has upvoted the comment or not
    $query = "SELECT * FROM `dvcomments` WHERE `CommentID`='$cid' AND `UserID`='$user_id'";
    if (!$qrun6 = mysqli_query($linkSQL, $query)) die(mysqli_error($linkSQL));
    if (mysqli_num_rows($qrun6) == 1) $str1 .= "class='fa fa-thumbs-down button2'";
    else $str1 .= "class='fa fa-thumbs-o-down button2'";

    $str1 .= " id='dvc".$cid."' onclick='downvotecomment($cid, $id)'>($cdv)</i>";

    // check whether Delete Comment will be available or not
    if (($user['AcType'] == 'A') || ($cuid == $user_id))
      $str1 .= "<input type='submit' value='Delete' class='button2 button3' onclick='delComment($cid, $id)'>";
    
    $str1 .= "</div></div><br>";
    $com = $str1 . $com;
  }
  $str .= $com;
  $str .= "<br><input type='text' id='ca".$id."' placeholder='Max 200 chars allowed' class='text'> 
    <input type='submit' value='Add comment' class='button' onclick='addComment($id)'>
    </div>
  </div>";
  $add = $str.$add;
}
?>

<!DOCTYPE html>
<html>
  <head>
    <link href='https://fonts.googleapis.com/css?family=Almendra SC' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link type="text/css" rel="stylesheet" href="main.css">
    <link rel="shortcut icon" href="fevicon.ico">
    <script type="text/javascript" src="main.js"></script>
    <title>Moulindu : Home</title>
  </head>
  <body>
    <div class='header'>
      <h1><span class="h1">MOULINDU</span></h1><br><br>
      Welcome <?php echo $fname . " " . $lname; ?>
      <a class="logout" href='logout.php'>Log out</a>
    </div>
    <br><br><br><br><br><br><br><br>
    <div class="add">
      <input type="submit" id="add" value="Add Topic" class="button" onclick="openAddTopic()">
    </div>
    <div id="modal"><div id="addTopic">
      <textarea rows="20" cols="200" id="topic" placeholder="Maximum of 500 characters are allowed"></textarea><br><br>
      <input type="submit" value="Add" class="button" onclick="addTopic()">
      <input type="submit" value="Discard" class="button" onclick="discard()">
    </div></div>
    <div id="showTopics">
      <?php echo $add; ?>
    </div>
  </body>
</html>