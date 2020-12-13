<?php 
session_start();
require_once 'vendor/connect.php';
$WhoWin = $_POST['WhoWin'];
$id = $_SESSION['user']['id'];
if($WhoWin == 1){
    mysqli_query($connect,"UPDATE users SET WinEasyBot=WinEasyBot+1 WHERE id='$id'");
    $_SESSION['user']['WinEasyBot'] +=1;
} else if ($WhoWin == 2) {
    mysqli_query($connect,"UPDATE users SET LoseEasyBot=LoseEasyBot+1 WHERE id='$id'");
    $_SESSION['user']['LoseEasyBot'] +=1;
} else if ($WhoWin == 3){
    mysqli_query($connect,"UPDATE users SET WinHardBot=WinHardBot+1 WHERE id='$id'");
    $_SESSION['user']['WinHardBot'] +=1;
} else if ($WhoWin == 4) {
    mysqli_query($connect,"UPDATE users SET LoseHardBot=LoseHardBot+1 WHERE id='$id'");
    $_SESSION['user']['LoseHardBot'] +=1;
}

echo $WhoWin;
?>