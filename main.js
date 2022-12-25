const labelTime = document.querySelector(".label-time");

const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");
const btnLap = document.querySelector(".btn-lap");
const btnResume = document.querySelector(".btn-resume");
const btnReset = document.querySelector(".btn-reset");

const containerLaps = document.querySelector(".laps-container");

const tick = function () {
  seconds++;
  const minute = Math.trunc(seconds / 60);
  const second = seconds % 60;

  const strMinute = String(minute).padStart(2, 0);
  const strSecond = String(second).padStart(2, 0);

  labelTime.textContent = `${strMinute}:${strSecond}`;
};

const reset = function () {
  seconds = 0;
  laps.splice(0);
  labelTime.textContent = "00:00";
};

let seconds, timer;
const laps = [];
reset();

btnStart.addEventListener("click", function () {
  timer = setInterval(tick, 1000);

  btnStart.classList.add("hidden");
  btnStop.classList.remove("hidden");
});

btnStop.addEventListener("click", function () {
  clearInterval(timer);

  btnStop.classList.add("hidden");
  btnLap.classList.add("hidden");
  btnResume.classList.remove("hidden");
  btnReset.classList.remove("hidden");
});

btnLap.addEventListener("click", function () {
  laps.push(labelTime.textContent);

  containerLaps.textContent = "";

  laps.forEach(function (lap, i) {
    const index = String(i + 1).padStart(2, 0);
    const html = `<div>${index} ${lap}</div>`;

    containerLaps.insertAdjacentHTML("afterbegin", html);
  });
});

btnResume.addEventListener("click", function () {
  timer = setInterval(tick, 1000);

  btnStop.classList.remove("hidden");
  btnLap.classList.remove("hidden");
  btnResume.classList.add("hidden");
  btnReset.classList.add("hidden");
});

btnReset.addEventListener("click", function () {
  clearInterval(timer);
  reset();
  containerLaps.textContent = "";

  btnStart.classList.remove("hidden");
  btnLap.classList.remove("hidden");
  btnResume.classList.add("hidden");
  btnReset.classList.add("hidden");
});
