<?php
$md = "";
$dt = "";
function dateFormat($date) {
    return $date[8].$date[9].$date[5].$date[6].$date[0].$date[1].$date[2].$date[3];
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST['date'])) $dt = dateFormat($_POST['date']);
    if(isset($_POST['word'])) $md = md5($_POST['word']);
}
?>

<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
    Enter the word <input type="text" name="word"><br>
    <input type="date" name="date"><br>
    <input type="number">
    <input type="time">
    <br><br>
    <input type="submit" value="Check MD5 value"><br><br>
    MD5 value: <?php echo " ".$md; ?><br>
    Date: <?php echo " ".$dt; ?><br>
</form>