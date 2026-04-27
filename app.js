const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");
const session = document.querySelector(".minutes");

let myInterval;
let state = true;
let totalSeconds;

const appTimer = () => {
  if (state) {
    state = false;

    // Only set if not already set
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
        state = true;
      }
    };

    myInterval = setInterval(updateSeconds, 1000);
  }
};

startBtn.addEventListener("click", appTimer);

pauseBtn.addEventListener("click", () => {
  clearInterval(myInterval);
  state = true;
});

resetBtn.addEventListener("click", () => {
    state = true;
    clearInterval(myInterval);
    totalSeconds = null;

    session.textContent = "25";
    document.querySelector(".seconds").textContent = "00";
});