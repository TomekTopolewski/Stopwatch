const labelTime = document.querySelector(".label-main-timer");
const labelLapTime = document.querySelector(".label-lap-timer");
const headerLap = document.querySelector(".laps-header");

const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");
const btnLap = document.querySelector(".btn-lap");
const btnResume = document.querySelector(".btn-resume");
const btnReset = document.querySelector(".btn-reset");

const containerLaps = document.querySelector(".laps-container");

const mainTimer = {
  seconds: 0,
  label: labelTime,
  handler: "",
};

const lapTimer = {
  seconds: 0,
  label: labelLapTime,
  handler: "",
};

const tick = function (timer) {
  timer.seconds++;
  const minute = Math.trunc(timer.seconds / 60);
  const second = timer.seconds % 60;

  const strMinute = String(minute).padStart(2, 0);
  const strSecond = String(second).padStart(2, 0);

  timer.label.textContent = `${strMinute}:${strSecond}`;
};

const reset = function (timer) {
  timer.seconds = 0;
  timer.label.textContent = "00:00";
};

const laps = [];

reset(mainTimer);
reset(lapTimer);

btnStart.addEventListener("click", function () {
  mainTimer.handler = setInterval(tick, 1000, mainTimer);

  btnStart.classList.add("hidden");
  btnStop.classList.remove("hidden");
});

btnStop.addEventListener("click", function () {
  clearInterval(mainTimer.handler);
  clearInterval(lapTimer.handler);

  btnStop.classList.add("hidden");
  btnLap.classList.add("hidden");

  btnResume.classList.remove("hidden");
  btnReset.classList.remove("hidden");
});

btnLap.addEventListener("click", function () {
  // If exist, write lap time into laps array
  if (lapTimer.seconds === 0) {
    laps.push({
      lapTime: mainTimer.label.textContent,
      overallTime: mainTimer.label.textContent,
    });
  } else {
    laps.push({
      lapTime: lapTimer.label.textContent,
      overallTime: mainTimer.label.textContent,
    });
  }

  // Clear lap timer
  if (lapTimer.handler) {
    clearInterval(lapTimer.handler);
    reset(lapTimer);
  }

  // Create a new lap timer
  lapTimer.handler = setInterval(tick, 1000, lapTimer);

  // Clear UI
  containerLaps.textContent = "";

  // Show header
  headerLap.classList.remove("hidden");

  // Display laps array
  laps.forEach(function (lap, i) {
    const index = String(i + 1).padStart(2, 0);
    const html = `<div class='lap'>
    <div>${index}</div> 
    <div>${lap.lapTime}</div> 
    <div>${lap.overallTime}</div>
    </div>`;
    containerLaps.insertAdjacentHTML("afterbegin", html);
  });
});

btnResume.addEventListener("click", function () {
  mainTimer.handler = setInterval(tick, 1000, mainTimer);
  lapTimer.handler = setInterval(tick, 1000, lapTimer);

  btnStop.classList.remove("hidden");
  btnLap.classList.remove("hidden");

  btnResume.classList.add("hidden");
  btnReset.classList.add("hidden");
});

btnReset.addEventListener("click", function () {
  clearInterval(mainTimer.handler);
  reset(mainTimer);

  clearInterval(lapTimer.handler);
  reset(lapTimer);

  laps.splice(0);
  containerLaps.textContent = "";

  btnStart.classList.remove("hidden");
  btnLap.classList.remove("hidden");

  btnResume.classList.add("hidden");
  btnReset.classList.add("hidden");
});
