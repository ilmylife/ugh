const workTime_50 = 50 * 60;
const breakTime_10 = 10 * 60;
let sessionMode = 0; // 0 = 25/5, 1 = 50/10, 2 = 7/3

const workTime_7 = 7 * 60;
const breakTime_3 = 3 * 60;

const workTime_1 = 0.5 * 60;

let workTime = 25 * 60;
let breakTime = 5 * 60;
let totalSeconds = 0;
let isRunning = false;
let isWorkSession = false;
let timerDisplay = document.querySelector(".timerDisplay");
let interval;
let mode = document.getElementById("mode");

//start timer function
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        //displaying the time in the right format
        timerDisplay.textContent = (minutes < 10 ? "0" : "") + minutes + ":" +
          (seconds < 10 ? "0" : "") + seconds;
      } else {
        clearInterval(interval);
        isRunning = false;
        isWorkSession = !isWorkSession;
        totalSeconds = isWorkSession ? workTime : breakTime;
        mode.textContent = isWorkSession ? "Work session" : "Break session";
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        timerDisplay.textContent = (minutes < 10 ? "0" : "") + minutes + ":" +
          (seconds < 10 ? "0" : "") + seconds;
        startTimer()
      }

    }, 1000);
  }
}
//stop timer function
function stopTimer() {
  clearInterval(interval);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  if (isWorkSession) {
    totalSeconds = workTime;
  } else {
    totalSeconds = breakTime;
  }
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  timerDisplay.textContent = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function toggleSessionType() {
  stopTimer();

  document.body.classList.remove("crashout-mode");
  document.body.classList.remove("test-mode");

  // Cycle through the modes: 0 -> 1 -> 2 -> 0
  sessionMode = (sessionMode + 1) % 4;

  let newButtonText = "";

  switch (sessionMode) {
    case 0:
      workTime = 25 * 60;
      breakTime = 5 * 60;
      newButtonText = "Long session";
      break;
    case 1:
      workTime = workTime_50;
      breakTime = breakTime_10;
      newButtonText = "Crashout session";
      break;
    case 2:
      workTime = workTime_7;
      breakTime = breakTime_3;
      newButtonText = "Test session";
      document.body.classList.add("crashout-mode");
      break;
    case 3:
      workTime = workTime_1;
      breakTime = workTime_1;
      newButtonText = "Short session"
      document.body.classList.add("test-mode");
      break;
  }

  //
  document.getElementById("toggleButton").textContent = newButtonText;

  totalSeconds = workTime;
  isWorkSession = true;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  timerDisplay.textContent = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  mode.textContent = "Work session";
}

let toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", toggleSessionType);
