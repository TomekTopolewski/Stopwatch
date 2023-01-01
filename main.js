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
  miliSeconds: 0,
  label: labelTime,
  handler: 0,
};

const lapTimer = {
  miliSeconds: 0,
  label: labelLapTime,
  handler: 0,
};

const tick = function (timer) {
  timer.miliSeconds += 100;

  const minutes = Math.trunc(timer.miliSeconds / 60000);
  const seconds = ((timer.miliSeconds % 60000) / 1000).toFixed(2, 0);

  const strMinutes = String(minutes).padStart(2, 0);
  const strSeconds = String(seconds).split(".")[0].padStart(2, 0);
  const strPrecision = String(seconds).split(".")[1];

  timer.label.textContent = `${strMinutes}:${strSeconds}.${strPrecision}`;
};

const reset = function (timer) {
  timer.miliSeconds = 0;
  timer.label.textContent = "00:00";
};

const laps = [];

reset(mainTimer);
reset(lapTimer);

btnStart.addEventListener("click", function () {
  mainTimer.handler = setInterval(tick, 100, mainTimer);

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
  if (lapTimer.miliSeconds === 0) {
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
  lapTimer.handler = setInterval(tick, 100, lapTimer);

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
  mainTimer.handler = setInterval(tick, 100, mainTimer);
  if (lapTimer.handler) lapTimer.handler = setInterval(tick, 1000, lapTimer);

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
