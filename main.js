const btnStart = document.querySelector("#start-btn");
const pageMenu = document.querySelector("#page-one");
const pageGame = document.querySelector("#page-two");
const inputForm = document.querySelector("#quantity");
const sendResult = document.querySelector("#btn-form");
const form = document.querySelector("#form");
const indication = document.querySelector("#result");
const tryTimes = document.querySelector("#score");
const btnRestart = document.querySelector("#btn-restart");
const canvas = document.querySelector("#myCanvas");
const context = canvas.getContext("2d");
const pattern = /^(?:[0-9]|[1-9][0-9]|[1-4][0-9]{2}|500)$/;
let guessNumber = Math.floor(Math.random() * 500);
let errorLower = 0;
let errorUpper = 0;
let score = 0;

const startGame = () => {
  pageMenu.style.display = "none";
  pageGame.style.display = "initial";
};

const game = (result) => {
  if (result != guessNumber) {
    score++;
  }
  currentGame(result);
  clearValue();
};

const currentGame = (value) => {
  console.log(guessNumber);
  drawCross(value);
  tryTimes.innerHTML = `Essaie : ${score}`;
  if (value == guessNumber) {
    errorUpper = 0;
    errorLower = 0;
    indication.innerHTML = `🟢 Bravo le nombre etais : ${guessNumber}`;
    return;
  }

  if (value < guessNumber) {
    if (errorLower > 0) {
      indication.innerHTML = `🔻 Le nombre est trop petit ! X ${errorLower}`;
      errorUpper = 0;
      errorLower++;
    } else {
      indication.innerHTML = "🔻 Le nombre est trop petit !";
      errorLower++;
    }
  } else if (value > guessNumber) {
    if (errorUpper > 0) {
      indication.innerHTML = `🔺 Le nombre est trop grand ! X ${errorUpper}`;
      errorLower = 0;
      errorUpper++;
    } else {
      indication.innerHTML = "🔺 Le nombre est trop grand !";
      errorUpper++;
    }
  }
};

const clearValue = () => {
  inputForm.value = "";
};

const drawCross = (result) => {
  const armLength = 20;
  let centerX = result - 20;
  const centerY = 25;

  if (result > 495) {
    centerX -= 5;
  } else if (result < 20) {
    centerX = result - 4;
  }

  if (result == guessNumber) {
    winGame(centerX);
    return;
  }
  context.beginPath();
  context.moveTo(centerX - armLength / 3, centerY - armLength / 3);
  context.lineTo(centerX + armLength / 3, centerY + armLength / 3);

  context.moveTo(centerX + armLength / 3, centerY - armLength / 3);
  context.lineTo(centerX - armLength / 3, centerY + armLength / 3);
  context.strokeStyle = "red";
  context.lineWidth = 2;

  context.stroke();
  context.closePath();
};

const winGame = (x) => {
  context.beginPath();
  context.arc(x, 25, 10, 0, 2 * Math.PI);
  context.fillStyle = "#22c55e";
  context.fill();
  context.closePath();

  sendResult.style.display = "none";
  inputForm.style.width = "100%";
  btnRestart.style.display = "initial";
};

const restartGame = () => {
  score = 0;
  guessNumber = Math.floor(Math.random() * 500);
  console.log(guessNumber);
  indication.innerHTML = "";
  tryTimes.innerHTML = `Essaie : ${score}`;
  sendResult.style.display = "initial";
  inputForm.style.width = "410px";
  context.clearRect(0, 0, canvas.width, canvas.height);
  btnRestart.style.display = "none";
  return;
};

btnStart?.addEventListener("click", () => {
  startGame();
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputForm?.addEventListener("click", () => {
  clearValue();
});

sendResult?.addEventListener("click", () => {
  const result = inputForm.value;
  if (!pattern.test(result)) return;
  game(result);
});

btnRestart.addEventListener("click", () => {
  restartGame();
});
