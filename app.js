const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");
const session = document.querySelector(".minutes");

let myInterval;
let isRunning = false;
let totalSeconds;

const appTimer = () => {
  if (isRunning) return; // prevents intervals

  isRunning = true;

  if (!totalSeconds) {
    const sessionAmount = Number.parseInt(session.textContent);
    totalSeconds = sessionAmount * 60;
  }

  const updateSeconds = () => {
    const minuteDiv = document.querySelector(".minutes");
    const secondDiv = document.querySelector(".seconds");

    totalSeconds--;

    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    secondDiv.textContent = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;
    minuteDiv.textContent = `${minutesLeft}`;

    if (minutesLeft === 0 && secondsLeft === 0) {
      bells.play();
      clearInterval(myInterval);
      isRunning = false;
      totalSeconds = null;
    }
  };

  myInterval = setInterval(updateSeconds, 1000);
};

startBtn.addEventListener("click", appTimer);

pauseBtn.addEventListener("click", () => {
  if(isRunning){
    clearInterval(myInterval);
    isRunning = false;
    pauseBtn.textContent = "Resume";
  }else{
    appTimer();
    pauseBtn.textContent = "Pause";
  }
});

resetBtn.addEventListener("click", () => {
    clearInterval(myInterval);
    isRunning = false;
    totalSeconds = null;

    session.textContent = "25";
    document.querySelector(".seconds").textContent = "00";
    pauseBtn.textContent = "Pause";
});