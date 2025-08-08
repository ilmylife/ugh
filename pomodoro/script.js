const workTime_50 = 50 * 60;
const breakTime_10 = 10 * 60;
let sessionMode = 0; // 0 = 25/5, 1 = 50/10, 2 = 7/3

const workTime_7 = 7 * 60;
const breakTime_3 = 3 * 60;

const workTime_1 = 0.5 * 60;

let workTime = 25 * 60;
let breakTime = 5 * 60;
let totalSeconds = workTime;
let isRunning = false;
let isWorkSession = true;
let timerDisplay = document.querySelector(".timerDisplay");
let interval;
let mode = document.getElementById("mode");
const modeDisplay = document.getElementById("modeDisplay");

function updateModeDisplay() {
  const modeNames = {
    0: "Current Session:<br>Short Session",
    1: "Current Session:<br>Long Session",
    2: "Current Session:<br>Crashout Session",
    3: "Current Session:<br>Test Session"
  }
  if (modeDisplay) {
    modeDisplay.innerHTML = modeNames[sessionMode];
  }
}

function updateTimerDisplay() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  timerDisplay.textContent = (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds;
}
//start timer function
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimerDisplay();
      } else {
       isWorkSession = !isWorkSession;
       totalSeconds = isWorkSession ? workTime : breakTime;
       mode.textContent = isWorkSession ? "Work session" : "Break session";
       updateTimerDisplay();
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
  isWorkSession = true;
  totalSeconds = workTime;
  mode.textContent = "Work session";
  updateTimerDisplay();
}

let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function toggleSessionType() {
  stopTimer();

  document.body.classList.remove("crashout-mode", "test-mode");

  // Cycle through the modes: 0 -> 1 -> 2 -> 0
  sessionMode = (sessionMode + 1) % 4;

  let newButtonText = "";

  switch (sessionMode) {
    case 0:
      workTime = 25 * 60;
      breakTime = 5 * 60;
      newButtonText = "Next:<br>Long session";
      break;
    case 1:
      workTime = workTime_50;
      breakTime = breakTime_10;
      newButtonText = "Next:<br>Crashout session";
      break;
    case 2:
      workTime = workTime_7;
      breakTime = breakTime_3;
      newButtonText = "Next:<br>Test session";
      document.body.classList.add("crashout-mode");
      break;
    case 3:
      workTime = workTime_1;
      breakTime = workTime_1;
      newButtonText = "Next:<br>Short session"
      document.body.classList.add("test-mode");
      break;
  }

  updateModeDisplay();
  document.getElementById("toggleButton").innerHTML = newButtonText;
  resetTimer();
}

let toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", toggleSessionType);

const clockDisplay = document.getElementById("currentTime");

function showCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  if (clockDisplay) {
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

setInterval(showCurrentTime, 1000);

showCurrentTime()

updateModeDisplay();

const fullscreenButton = document.getElementById('fullscreenButton');

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

if (fullscreenButton) {
  fullscreenButton.addEventListener('click', toggleFullScreen);
}

