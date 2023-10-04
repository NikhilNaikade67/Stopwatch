let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function start() {
    if (!startTime) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
    }
}

function pause() {
    clearInterval(timerInterval);
    startTime = null;
}

function reset() {
    clearInterval(timerInterval);
    startTime = null;
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = '';
}

function lap() {
    if (startTime) {
        const lapTime = Date.now() - startTime;
        elapsedTime += lapTime;
        startTime = Date.now();
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(lapTime);
        lapsList.appendChild(lapItem);
    }
}

function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes}:${seconds}:${millisecondsFormatted}`;
}
