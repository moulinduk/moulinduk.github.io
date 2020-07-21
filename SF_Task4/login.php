<?php

$userEr = $passEr = $typeEr = "";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    //echo "Check";
    $username = $_POST['username'];
    $password = $_POST['password'];
    if (empty($username)) $userEr = "Username is must";
    else if (empty($password)) $passEr = "Password is must";
    else if (!preg_match("/^[a-zA-Z0-9]*$/",$username)) {
      $userEr = "Invalid username";
    }
    else if (!isset($_POST['actype'])) $typeEr = "Account type is must";
    else
    {
        $password = md5($password);
        $actype = $_POST['actype'];
        $query = "SELECT `ID` FROM `users` WHERE `Username`=? AND `Password`='$password' AND `AcType`='$actype'";

        $stmt = mysqli_stmt_init($linkSQL);
        if (!mysqli_stmt_prepare($stmt, $query)) die(mysqli_error($linkSQL));
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);

        if (!($qrun = mysqli_stmt_get_result($stmt))) die(mysqli_error($linkSQL));
        $rows = mysqli_num_rows($qrun);
        if ($rows == 0)
        {
          $userEr = "Invalid Credentials";
        }
        else if ($rows == 1)
        {
            $user_id = mysqli_fetch_assoc($qrun)['ID'];
            $_SESSION['user_id'] = $user_id;
            header("Location: index.php");
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
    <title>Log In : Moulindu : First Account Based Website By Moulindu Kundu</title>
  </head>
  <body class="loginbody">
    <div class='header'>
      <h1><span class="h1">MOULINDU</span></h1><br>
    </div>
    <h2 class="h2">Log In Details</h2><br><br>
    <div class="form">
    <form method="POST" action="<?php echo htmlspecialchars($current_file); ?>">
      <label>Username:</label> <input type="text" name="username" placeholder="Username" class="text">
      <span class="error"><?php echo $userEr; ?></span><br><br>
      <label>Password:</label> <input type="password" name="password" placeholder="Password" class="text" id="pass">
      <span class="error"><?php echo $passEr; ?></span>
      <br><br><label class="blank"></label>
      <div class="radio"> <input type="checkbox" onclick="shpass('pass')"> Show Password</div>
      <br><br>
      <label>Account Type:</label>
      <div class="radio"> 
        <input type="radio" name="actype" value="U">User 
        <input type="radio" name="actype" value="A">Admin
        <span class="error"><?php echo $typeEr; ?></span>
      </div><br><br>
      <div  style="text-align: center;"><input type="submit" value="Log In" class="button"></div>
    </form>
    </div>
    <br><br>
    <a href="register.php">New User? Click to register</a>
  </body>
</html>