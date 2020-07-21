<!DOCTYPE html>
<html>
    <body>
        <?php

        require "connect.php";
        require "core.php"; 

        if(!session_id()) session_start();
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
// c : All comments div
// ca: Add comment textbox
// cm: For each comment
// cs: For Comments(0) button


        $m = intval($_GET['m']);
        if ($m == 1)
        {
            $topic = test_input($_GET['t']) ;
            if (strlen($topic) > 0) {
                $query = "INSERT INTO `topics` (`ID`, `UserID`, `Topic`) VALUES (NULL, '$user_id', ?)";
                
                $stmt = mysqli_stmt_init($linkSQL);
                if (!mysqli_stmt_prepare($stmt, $query)) die(mysqli_error($linkSQL));
                mysqli_stmt_bind_param($stmt, "s", $topic);
                mysqli_stmt_execute($stmt);
                //if (!($qrun = mysqli_stmt_get_result($stmt))) die(mysqli_error($linkSQL));

                $query = "SELECT * FROM `topics` WHERE `UserID`='$user_id'";
                if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
                $n = mysqli_num_rows($qrun);
                while ($tps = mysqli_fetch_assoc($qrun)) $id = $tps['ID'];
                echo "<div class='topic' id='t".$n."'>
                        <h2>".$fname." ".$lname."</h2>
                        <br><p>".$topic."</p><br>
                        <i class=\"fa fa-thumbs-o-up button2\" aria-hidden=\"true\" id='uv".$id ."' onclick='upvote(".$id .")'>(0)</i>
                        <i class=\"fa fa-thumbs-o-down button2\" aria-hidden=\"true\" id='dv".$id ."' onclick='downvote(".$id .")'>(0)</i>
                        <input type='submit' value='Comments(0)' class='button2 button3' onclick='comments($id)' id='cs$id'>
                        <input type='submit' value='Delete' class='button2 button3' onclick='delTopic(".$n.", ".$id.")'>
                        <div class='comments' id='c$id'>
                            <br><input type='text' id='ca".$id."' placeholder='Max 200 chars allowed' class='text'> 
                            <input type='submit' value='Add comment' class='button' onclick='addComment($id)'>
                        </div>
                    </div>";
            }
        }

        else if ($m == 2)
        {
            $delid = intval($_GET['id']);
            $query = "DELETE FROM `topics` WHERE `ID`='$delid'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `uvtopics` WHERE `TopicID`='$delid'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `dvtopics` WHERE `TopicID`='$delid'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `comments` WHERE `TopicID`='$delid'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `uvcomments` WHERE `TopicID`='$delid'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `dvcomments` WHERE `TopicID`='$delid'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        }

        else if ($m == 3){
            $id = intval($_GET['id']);
            $query = "INSERT INTO `uvtopics` (`ID`, `TopicID`, `UserID`) VALUES (NULL, '$id', '$user_id')";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `dvtopics` WHERE `TopicID`='$id' AND `UserID`='$user_id'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        }
        else if ($m == 4){
            $id = intval($_GET['id']);
            $query = "INSERT INTO `dvtopics` (`ID`, `TopicID`, `UserID`) VALUES (NULL, '$id', '$user_id')";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `uvtopics` WHERE `TopicID`='$id' AND `UserID`='$user_id'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        }
        else if ($m == 5){
            $id = intval($_GET['id']);
            $nu = intval($_GET['nu']);
            $nd = intval($_GET['nd']);
            $query = "DELETE FROM `uvtopics` WHERE `TopicID`='$id' AND `UserID`='$user_id'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `dvtopics` WHERE `TopicID`='$id' AND `UserID`='$user_id'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        }
        else if ($m === 6) {
            $comment = test_input($_GET['c']) ;
            $id = intval($_GET['id']);
            if (strlen($comment) > 0) {
                $query = "INSERT INTO `comments` (`ID`, `TopicID`, `Comment`, `UserID`) VALUES (NULL, '$id', ?, '$user_id')";
                
                $stmt = mysqli_stmt_init($linkSQL);
                if (!mysqli_stmt_prepare($stmt, $query)) die(mysqli_error($linkSQL));
                mysqli_stmt_bind_param($stmt, "s", $comment);
                mysqli_stmt_execute($stmt);
                //if (!($qrun = mysqli_stmt_get_result($stmt))) die(mysqli_error($linkSQL));

                $query = "SELECT * FROM `comments` WHERE `TopicID`='$id'";
                if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
                while ($tps = mysqli_fetch_assoc($qrun)) $cid = $tps['ID'];
                $ret = "<div class='li' id='cm$cid'>
                        <h4>".$fname." ".$lname."</h4>
                        $comment <br><br><div class='radio'>
                        <i class=\"fa fa-thumbs-o-up button2\" aria-hidden=\"true\" id='uvc$cid' onclick='upvotecomment($cid, $id)'>(0)</i>
                        <i class=\"fa fa-thumbs-o-down button2\" aria-hidden=\"true\" id='dvc$cid' onclick='downvotecomment($cid, $id)'>(0)</i>";
                $ret .= "<input type='submit' class='button2 button3' value='Delete' onclick='delComment($cid, $id)'>";
                $ret .= "</div></div><br>";
                echo $ret;
            }
        }
        else if ($m == 7) {
            $delcid = intval($_GET['cid']);
            $query = "DELETE FROM `comments` WHERE `ID`='$delcid'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `uvcomments` WHERE `CommentID`='$delid'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `dvcomments` WHERE `CommentID`='$delid'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        }

        else if ($m == 8){
            $cid = intval($_GET['cid']);
            $id = intval($_GET['id']);
            $query = "INSERT INTO `uvcomments` (`ID`, `CommentID`, `UserID`, `TopicID`) VALUES (NULL, '$cid', '$user_id', '$id')";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `dvcomments` WHERE `CommentID`='$cid' AND `UserID`='$user_id'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        }
        else if ($m == 9){
            $cid = intval($_GET['cid']);
            $id = intval($_GET['id']);
            $query = "INSERT INTO `dvcomments` (`ID`, `CommentID`, `UserID`, `TopicID`) VALUES (NULL, '$cid', '$user_id', '$id')";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `uvcomments` WHERE `CommentID`='$cid' AND `UserID`='$user_id'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        }
        else if ($m == 10){
            $cid = intval($_GET['cid']);
            $id = intval($_GET['id']);
            $query = "DELETE FROM `uvcomments` WHERE `CommentID`='$cid' AND `UserID`='$user_id'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
            $query = "DELETE FROM `dvcomments` WHERE `CommentID`='$cid' AND `UserID`='$user_id'";
            if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        }
        ?>
    </body>
</html>