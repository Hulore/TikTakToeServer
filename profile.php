<?php
session_start();
if (!$_SESSION['user']) {
    header('Location: /');
}
echo $_SESSION['user']['id'];
?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />

    <title>TikTakToe</title>
    <meta name="description" content="TikTakToe" />
    <meta name="author" content="Hulore" />
    <link rel="shortcut icon" href="icons/metaIcon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    <header>
      <div class="gameTitle">TikTakToe</div>
      <div class="hidden-win-table who-is-win"></div>
    </header>
    <main>
      <!--<div class="b-popup b-popup-show">
        <div class="b-popup-content">
          <div class="login-title">Регистрация/авторизация</div>
          <div id="" class="form-data">
            <div id="" class="form-data-block login-block">
              <p>Логин:</p>
              <label for="login"></label>
              <input
                type="text"
                id="login"
                name="login"
                placeholder="Введите логин"
              />
            </div>
            <div id="" class="form-data-block password-block">
              <p>Пароль:</p>
              <label for="password"></label>
              <input
                type="password"
                name="password"
                placeholder="Введите пароль"
                id="password"
              />
            </div>
            <input id="enter-button" type="button" value="Войти" />
          </div>
        </div>
      </div>-->
      <div class="asidePanelLeft">
        <div id="" class="caption">Выбери сторону</div>
        <div id="" class="choiceSide">
          <div id="" class="ofSide crossSide">Крестики</div>
          <div id="" class="ofSide circleSide">Нолики</div>
        </div>
        <div id="" class="caption">Выбери сложность</div>
        <div id="" class="choiceSide">
          <div id="" class="ofSide easyDif">Easy</div>
          <div id="" class="ofSide hardDif">Hard</div>
        </div>
      </div>
      <div class="blockOfGame">
        <div class="tttBlock"></div>
        <div class="tttBlock"></div>
        <div class="tttBlock"></div>
        <div class="tttBlock"></div>
        <div class="tttBlock"></div>
        <div class="tttBlock"></div>
        <div class="tttBlock"></div>
        <div class="tttBlock"></div>
        <div class="tttBlock"></div>
      </div>
      <div class="asidePanelRight">
        <div id="" class="rightBoxes nameBox">
          <div class="userName"><?= $_SESSION['user']['login'] ?></div>
        </div>
        <div id="" class="rightBoxes statBox">
          <div id="" class="nameStatBox">Стастистика</div>
          <div id="" class="textInStatBox winner">
            <strong>Победы:</strong>
            <div>Easy-bot: </div>
            <div class="winEasyBot"><?= $_SESSION['user']['WinEasyBot'] ?></div>
            <div>Hard-bot: </div>
            <div class="winHardBot"><?= $_SESSION['user']['WinHardBot'] ?></div>
          </div>
          <div id="" class="textInStatBox winner">
            <strong>Поражения:</strong>
            <div>Easy-bot: </div>
            <div class="loseEasyBot"><?= $_SESSION['user']['LoseEasyBot'] ?></div>
            <div>Hard-bot: </div>
            <div class="loseHardBot"><?= $_SESSION['user']['LoseHardBot'] ?></div>
          </div>
        </div>
        <div id="" class="rightBoxes settingsBox">
          <a href="vendor/logout.php" class="quit" cursor="pointer" >Выйти</a>
        </div>
      </div>
    </main>
    <footer>
      <div class="reset-button">Reset</div>
    </footer>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/scripts.js"></script>
    <script src="js/logscript.js"></script>
  </body>
</html>
