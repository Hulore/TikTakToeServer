//Переменная блоков
var TsBlocks = document.querySelectorAll(".tttBlock");
var crossSide = document.querySelector(".crossSide");
var circleSide = document.querySelector(".circleSide");
var easyDif = document.querySelector(".easyDif");
var hardDif = document.querySelector(".hardDif");
var resetButton = document.querySelector(".reset-button");
var winTable = document.querySelector(".who-is-win");
var WEB = document.querySelector(".winEasyBot");
var LEB = document.querySelector(".loseEasyBot");
var WHB = document.querySelector(".winHardBot");
var LHB = document.querySelector(".loseHardBot");
//Переменная для стороны
var side;
var difficult;
var antiside;
var winPlayer;
var freeslots = 0;
let WhoWin;
//Получение данных из формы регистрации

//Фунция для целых случайных чисел
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
//Создаём листенеры для кнопок выбора сторон
crossSide.addEventListener("click", function () {
  if (!side) {
    circleSide.classList.remove("background-choose");
    crossSide.classList.add("background-choose");
    side = "cross";
    antiside = "circle";
  }
});
circleSide.addEventListener("click", function () {
  if (!side) {
    crossSide.classList.remove("background-choose");
    circleSide.classList.add("background-choose");
    side = "circle";
    antiside = "cross";
    if (difficult) {
      botTernHard();
    }
  }
});
//Создаем листенеры для кнопок выбора сложности
easyDif.addEventListener("click", function () {
  if (!difficult) {
    hardDif.classList.remove("background-choose");
    easyDif.classList.add("background-choose");
    difficult = "easy";
    if (side == "circle") {
      botTernHard();
    }
  }
});
hardDif.addEventListener("click", function () {
  if (!difficult) {
    easyDif.classList.remove("background-choose");
    hardDif.classList.add("background-choose");
    difficult = "hard";
    if (side == "circle") {
      botTernHard();
    }
  }
});
//Создаем листенер для кнопки ресета
resetButton.addEventListener("click", function () {
  location.reload();
});
//Функция получения массива значений крестиков и нольков
var getValueTable = function () {
  freeslots = 0;
  var logicArrayBot = [];
  for (let i = 0; i < TsBlocks.length; i++) {
    if (TsBlocks[i].classList.contains("oTern") && antiside == "circle") {
      logicArrayBot[i] = "+";
    } else if (TsBlocks[i].classList.contains("xTern") && antiside == "cross") {
      logicArrayBot[i] = "+";
    } else if (TsBlocks[i].classList.contains("oTern") && antiside == "cross") {
      logicArrayBot[i] = "-";
    } else if (
      TsBlocks[i].classList.contains("xTern") &&
      antiside == "circle"
    ) {
      logicArrayBot[i] = "-";
    } else {
      logicArrayBot[i] = "0";
      freeslots += 1;
    }
  }
  return logicArrayBot;
};
//Функция вставки знака бота
var setBotChar = function (numBlock) {
  if (antiside == "cross") {
    TsBlocks[numBlock].classList.add("xTern");
  } else {
    TsBlocks[numBlock].classList.add("oTern");
  }
};
//Функция рандомного хода
var randomTern = function (logicArray) {
  let testTernBot = getRandomInt(9);
  if (logicArray[testTernBot] == 0) {
    setBotChar(testTernBot);
    return true;
  } else {
    return false;
  }
};
//Функция перебора 3-ел-ов для сложного хода
var tripleReseach = function (
  num1,
  idElement1,
  num2,
  idElement2,
  num3,
  idElement3
) {
  if (num1 == num2 && num1 != "0" && num3 == "0") {
    if (num1 == "+") {
      return "F" + idElement3;
    } else {
      return idElement3;
    }
  } else if (num1 == num3 && num1 != "0" && num2 == "0") {
    if (num1 == "+") {
      return "F" + idElement2;
    } else {
      return idElement2;
    }
  } else if (num2 == num3 && num2 != "0" && num1 == "0") {
    if (num2 == "+") {
      return "F" + idElement1;
    } else {
      return idElement1;
    }
  } else {
    return false;
  }
};
//Функция хорошего хода
var halfmindTern = function (logicArray) {
  let miniSuperTurnArray = [];
  let miniSuperTurn = false;
  //Создание массива
  miniSuperTurnArray[0] = tripleReseach(
    logicArray[0],
    0,
    logicArray[1],
    1,
    logicArray[2],
    2
  );
  miniSuperTurnArray[1] = tripleReseach(
    logicArray[3],
    3,
    logicArray[4],
    4,
    logicArray[5],
    5
  );
  miniSuperTurnArray[2] = tripleReseach(
    logicArray[6],
    6,
    logicArray[7],
    7,
    logicArray[8],
    8
  );
  miniSuperTurnArray[3] = tripleReseach(
    logicArray[0],
    0,
    logicArray[3],
    3,
    logicArray[6],
    6
  );
  miniSuperTurnArray[4] = tripleReseach(
    logicArray[1],
    1,
    logicArray[4],
    4,
    logicArray[7],
    7
  );
  miniSuperTurnArray[5] = tripleReseach(
    logicArray[2],
    2,
    logicArray[5],
    5,
    logicArray[8],
    8
  );
  miniSuperTurnArray[6] = tripleReseach(
    logicArray[0],
    0,
    logicArray[4],
    4,
    logicArray[8],
    8
  );
  miniSuperTurnArray[7] = tripleReseach(
    logicArray[2],
    2,
    logicArray[4],
    4,
    logicArray[6],
    6
  );
  for (let i = 0; i < miniSuperTurnArray.length; i++) {
    if (miniSuperTurnArray[i] !== false) {
      if (miniSuperTurnArray[i] > -1 && miniSuperTurnArray[i] < 9) {
        miniSuperTurn = miniSuperTurnArray[i];
      } else {
        miniSuperTurn = miniSuperTurnArray[i].substring(1);
        winPlayer = "lose";
        break;
      }
    }
  }
  if (miniSuperTurn !== false) {
    setBotChar(miniSuperTurn);
    return true;
  } else {
    return false;
  }
};
//Ход сложного бота
var botTernHard = function () {
  //Создаем массив, который будет видеть бот
  let logicArrayBot = [];
  //Он получает "+" - если клетка занята его стороной
  //"-" - если не его стороной
  //"0" - если клетка пуста
  // Генерируем массив значений блока клеток
  logicArrayBot = getValueTable();
  if (freeslots <= 5) {
    winPlayer = winDetected(logicArrayBot);
    console.log(winPlayer);
  }
  if (freeslots != 0 && !winPlayer) {
    let turnTrue = false;

    while (turnTrue != true) {
      //Умный ход
      turnTrue = halfmindTern(logicArrayBot);
      if (turnTrue) {
      }
      //рандомный ход
      if (turnTrue == false) {
        turnTrue = randomTern(logicArrayBot);
      }
    }
  }
  logicArrayBot = getValueTable();
  if (freeslots <= 5) {
    winPlayer = winDetected(logicArrayBot);
    console.log(winPlayer);
    if (winPlayer == "lose") {
      winTable.textContent = "Поражение";
      winTable.classList.remove("hidden-win-table");
      WhoWin = 4; // 4 - Lose Hard Bot
      //Визуальная смена статистики
      let num = parseInt(LHB.textContent, 10) + 1;
      LHB.textContent = num;
      SendDataTo(WhoWin);
    } else if (winPlayer == "win") {
      winTable.textContent = "Победа";
      winTable.classList.remove("hidden-win-table");
      WhoWin = 3; // 3 - Win Hard Bot
      //Визуальная смена статистики
      let num = parseInt(WHB.textContent, 10) + 1;
      WHB.textContent = num;
      SendDataTo(WhoWin);
    }
  }
  if (freeslots == 0) {
    console.log("ничья");
    winTable.textContent = "Ничья";
    winTable.classList.remove("hidden-win-table");
  }
};
// Ход легкого бота
var botTernEasy = function () {
  //Создаем массив, который будет видеть бот
  let logicArrayBot = [];
  //Он получает "+" - если клетка занята его стороной
  //"-" - если не его стороной
  //"0" - если клетка пуста
  // Генерируем массив значений блока клеток
  logicArrayBot = getValueTable();
  if (freeslots <= 5) {
    winPlayer = winDetected(logicArrayBot);
    console.log(winPlayer);
  }
  if (freeslots != 0 && !winPlayer) {
    let turnTrue = false;
    while (turnTrue != true) {
      //рандомный ход
      if (turnTrue == false) {
        turnTrue = randomTern(logicArrayBot);
      }
    }
  }
  logicArrayBot = getValueTable();
  if (freeslots <= 5) {
    winPlayer = winDetected(logicArrayBot);
    console.log(winPlayer);
    if (winPlayer == "lose") {
      winTable.textContent = "Поражение";
      winTable.classList.remove("hidden-win-table");
      WhoWin = 2; // 2 - lose easy bot
      //Визуальная смена статистики
      let num = parseInt(LEB.textContent, 10) + 1;
      LEB.textContent = num;
      SendDataTo(WhoWin);
    } else if (winPlayer == "win") {
      winTable.textContent = "Победа";
      winTable.classList.remove("hidden-win-table");
      WhoWin = 1; // 1 - win easy bot
      //Визуальная смена статистики
      let num = parseInt(WEB.textContent, 10) + 1;
      WEB.textContent = num;
      SendDataTo(WhoWin);
    }
  }
  if (freeslots == 0) {
    console.log("ничья");
    winTable.textContent = "Ничья";
    winTable.classList.remove("hidden-win-table");
  }
};
//Функция перебора 3-ех ел-ов для победы
var tripleReseachWin = function (
  num1,
  idElement1,
  num2,
  idElement2,
  num3,
  idElement3
) {
  if (num1 == num2 && num1 == num3 && num1 != 0) {
    if (num1 == "-") {
      return "win";
    } else {
      return "lose";
    }
  }
  return false;
};
//Функция детекта победы
var winDetected = function (logicArray) {
  let winnerDetectedArray = [];
  let winnerDetected = false;
  //Создание массива
  winnerDetectedArray[0] = tripleReseachWin(
    logicArray[0],
    0,
    logicArray[1],
    1,
    logicArray[2],
    2
  );
  winnerDetectedArray[1] = tripleReseachWin(
    logicArray[3],
    3,
    logicArray[4],
    4,
    logicArray[5],
    5
  );
  winnerDetectedArray[2] = tripleReseachWin(
    logicArray[6],
    6,
    logicArray[7],
    7,
    logicArray[8],
    8
  );
  winnerDetectedArray[3] = tripleReseachWin(
    logicArray[0],
    0,
    logicArray[3],
    3,
    logicArray[6],
    6
  );
  winnerDetectedArray[4] = tripleReseachWin(
    logicArray[1],
    1,
    logicArray[4],
    4,
    logicArray[7],
    7
  );
  winnerDetectedArray[5] = tripleReseachWin(
    logicArray[2],
    2,
    logicArray[5],
    5,
    logicArray[8],
    8
  );
  winnerDetectedArray[6] = tripleReseachWin(
    logicArray[0],
    0,
    logicArray[4],
    4,
    logicArray[8],
    8
  );
  winnerDetectedArray[7] = tripleReseachWin(
    logicArray[2],
    2,
    logicArray[4],
    4,
    logicArray[6],
    6
  );
  for (let i = 0; i < winnerDetectedArray.length; i++) {
    if (winnerDetectedArray[i] != false) {
      winnerDetected = winnerDetectedArray[i];
      return winnerDetected;
    }
  }
  return false;
};
// Функция замыкания, принимает блок и сторону за которую играет игрок
var TsBlockaddListener = function (tBlock) {
  tBlock.addEventListener("click", function () {
    //Назначение блоку соответсвующего знака
    //Перед этим проверка, является ли блок пустым
    if (
      !tBlock.classList.contains("oTern") &&
      !tBlock.classList.contains("xTern")
    ) {
      if (side === "cross" && difficult && !winPlayer) {
        tBlock.classList.remove("oTern");
        tBlock.classList.add("xTern");
      } else if (side === "circle" && difficult && !winPlayer) {
        tBlock.classList.remove("xTern");
        tBlock.classList.add("oTern");
      } else {
        if (!winPlayer) {
          alert("Выберите сложность и сторону!");
        } else {
          alert("Игра оконченна!");
        }
        console.log("Ошибка");
      }

      //Реагирующий бот
      if (!winPlayer) {
        if (antiside == "cross" || antiside == "circle") {
          if (difficult == "hard") {
            botTernHard();
          } else if (difficult == "easy") {
            botTernEasy();
          }
        } else {
          console.log("Ошибка");
        }
      }
    }
  });
};
// Функция AJAX передача данных серверу
var SendDataTo = function (WhoWin) {
  console.log(WhoWin);
  $.ajax({
    url: "connectServer.php",
    type: "POST",
    dataType: "html",
    data: {
      WhoWin: WhoWin,
    },
    success: function (data) {
      console.log("Success");
    },
    error: function (jqXHR, exception) {
      var msg = "";
      if (jqXHR.status === 0) {
        msg = "Not connect.\n Verify Network.";
      } else if (jqXHR.status == 404) {
        msg = "Requested page not found. [404]";
      } else if (jqXHR.status == 500) {
        msg = "Internal Server Error [500].";
      } else if (exception === "parsererror") {
        msg = "Requested JSON parse failed.";
      } else if (exception === "timeout") {
        msg = "Time out error.";
      } else if (exception === "abort") {
        msg = "Ajax request aborted.";
      } else {
        msg = "Uncaught Error.\n" + jqXHR.responseText;
      }
      alert(msg);
    },
  });
};
// Цикл задания блоками листенеров
for (let i = 0; i < TsBlocks.length; i++) {
  TsBlockaddListener(TsBlocks[i]);
}
