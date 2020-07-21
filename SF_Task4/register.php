<?php 
require "connect.php";
require "core.php"; 
?>

<?php 
$fname = $lname = $user = $pass = $repass = $email = $gender = $type = "";
$fnameEr = $lnameEr = $userEr = $passEr = $repassEr = $emailEr = $genderEr = $typeEr = "";
?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
  if (empty($_POST["fname"])) $fnameEr = "This field is required.";
  else if (empty($_POST["lname"])) $lnameEr = "This field is required.";
  else if (empty($_POST["username"])) $userEr = "This field is required.";
  else if (empty($_POST["password"])) $passEr = "This field is required.";
  else if (empty($_POST["repassword"])) $repassEr = "This field is required.";
  else if (empty($_POST["gender"])) $genderEr = "This field is required.";
  else if (empty($_POST["actype"])) $typeEr = "This field is required.";
  else 
  {
    $fname = test_input($_POST["fname"]);
    $lname = test_input($_POST['lname']);
    $user = test_input($_POST['username']);
    $pass = test_input($_POST['password']);
    $repass = test_input($_POST['repassword']);
    $gender = test_input($_POST['actype']);
    $type = test_input($_POST['actype']);
    if (!preg_match("/^[a-zA-Z]*$/",$fname)) {
      $fnameEr = "Only letters allowed";
    }
    else if (!preg_match("/^[a-zA-Z]*$/",$lname)) {
      $lnameEr = "Only letters allowed";
    }
    else if (!preg_match("/^[a-zA-Z0-9]*$/",$user)) {
      $userEr = "Only letters and numbers allowed";
    }
    else if (strlen($pass) < 8 || strlen($pass) > 12) {
      $passEr = "Password length should be between 8 to 12";
    }
    else if ($pass != $repass) {
      $repassEr = "Password not confirmed";
    }
    else {
      $flag = true;
      if (!empty($_POST["email"]))
      {
        $email = test_input($_POST["email"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
        {
          $emailEr = "Invalid email";
          $flag = false;
        }
      }
      if ($flag) {
        $query = "SELECT `ID` FROM `users` WHERE `Username`='$user'";
        if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        if (mysqli_num_rows($qrun) > 0) {
          $userEr = "Username already exists. Choose a new one";
          $flag = false;
        }
      }
      if ($flag) {
        $pass = md5($pass);
        $query = "INSERT INTO `users` (`ID`, `Username`, `Password`, `FirstName`, `LastName`, `AcType`) VALUES (NULL, '$user', '$pass', '$fname', '$lname', '$type');";
        if (!($qrun = mysqli_query($linkSQL, $query))) die(mysqli_error($linkSQL));
        echo "<script>alert(\"Registration done successfully.\\nGo to log in page.\");</script>";
      }
    }
  }
}
?>

<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link type="text/css" rel="stylesheet" href="main.css">
    <link rel="shortcut icon" href="fevicon.ico">
    <script type="text/javascript" src="main.js"></script>
    <title>Register : Moulindu : First Account Based Website By Moulindu Kundu</title>
  </head>
  <body class="loginbody">
    <div class='header'>
      <h1><span class="h1">MOULINDU</span></h1><br>
    </div>
    <h2 class="h2">Registration Details</h2><br>
    <div class="form">
    <form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
      <p><span class="error">* required fields</span></p><br>
      <label>First Name:<span class="error">*</span></label> <input type="text" name="fname" placeholder="Only letters allowed" class="text">
      <span class="error"><?php echo $fnameEr; ?></span><br><br>

      <label>Last Name:<span class="error">*</span></label> <input type="text" name="lname" placeholder="Only letters allowed" class="text">
      <span class="error"><?php echo $lnameEr; ?></span><br><br>

      <label>Email:</label> <input type="email" name="email" placeholder="abc@xyz.com" class='text'>
      <span class="error"><?php echo $emailEr; ?></span><br><br>

      <label>Username:<span class="error">*</span></label> <input type="text" name="username" placeholder="Letters and numbers only" class="text">
      <span class="error"><?php echo $userEr; ?></span><br><br>

      <label>Password:<span class="error">*</span></label> <input type="password" name="password" placeholder="Length between 8 to 12" class="text" id="pass1">
      <span class="error"><?php echo $passEr; ?></span>
      <br><br><label class="blank"></label> 
      <div class="radio"> <input type="checkbox" onclick="shpass('pass1')"> Show Password</div><br><br>

      <label>Retype Password:<span class="error">*</span></label> <input type="password" name="repassword" placeholder="Must match with above" class="text" id="pass2">
      <span class="error"><?php echo $repassEr; ?></span>
      <br><br><label class="blank"></label> 
      <div class="radio"> <input type="checkbox" onclick="shpass('pass2')"> Show Password</div><br><br>

      <label>Gender:<span class="error">*</span></label>
      <div class="radio">  
        <input type="radio" name="gender" value="M">Male
        <input type="radio" name="gender" value="F">Female
        <input type="radio" name="gender" value="O">Other
        <span class="error"><?php echo $genderEr; ?></span>
      </div><br><br>

      <label>Account Type:<span class="error">*</span></label> 
      <div class="radio"> 
        <input type="radio" name="actype" value="U">User 
        <input type="radio" name="actype" value="A">Admin
        <span class="error"><?php echo $typeEr; ?></span>
      </div><br><br>

      <div  style="text-align: center;"><input type="submit" value="Register" class="button"></div>
    </form>
    </div>
    <br><br>
    <a href="index.php">Already have an account? <br>Click to go to Log In page</a>
    <br><br><br><br><br><br>
  </body>
</html>

