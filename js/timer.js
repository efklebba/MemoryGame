// Timer code
let seconds = 0;
let minutes = 0;
let hours = 0;
let stopWatch;

const timerElement = document.getElementById("timer");

function padNumber(value) {
    if (value < 10)
        return "0" + value;
    return value;
}

/*
 * The Date element was not used to convert the time variables to a readable format
 * because I did not believe the overhead of creating a Date variable would be
 * faster than creating a string literal.
 */
function drawTimer() {
    timerElement.innerHTML = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}

function addASecond() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;

        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    drawTimer();
}

function startTimer() {
    if (stopWatch != null)
	return;
    
    stopWatch = setInterval(function() {addASecond()}, 1000);
}

function stopTimer() {
    clearInterval(stopWatch);
    stopWatch = null;
}

function resetTimer() {
    stopTimer();

    seconds = 0;
    minutes = 0;
    hours = 0;

    drawTimer();
}
