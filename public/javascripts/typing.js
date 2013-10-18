
var correctChars = '';
var latestChar = 0;

function gameLogic(event) {
  var testString = document.getElementById("test").innerText;
  concatenatingString(event, testString);
  if (correctChars.length === testString.length) {
    var timeInSeconds = (timer.endTime - timer.startTime) / 1000;
    var wpm = wordsPerMinute(timeInSeconds, testString);
    renderSecondsElapsed("time-elapsed", timeInSeconds);
    renderWPM("wpm", wpm);
  }
}

function checkCorrect(char) {
  var testString = document.getElementById("test").innerText;
  if(char === testString[latestChar]) {
    ++latestChar;
    return true;
  }
  return false;
}

function keyPressed(keycode) {
  return String.fromCharCode(keycode);
}

function concatenatingString(event, string) {
  var letter = keyPressed(event.keyCode);

  if (checkCorrect(letter)) {
    correctChars = correctChars.concat(letter);
    setTimer(string);
    renderString("text", correctChars);
  }
}

var timer = {
  startTime: 0,
  endTime: 0,
  start: function() {
    this.startTime += new Date().getTime();
  },
  end: function() {
    this.endTime += new Date().getTime();
  }
};

function setTimer(comparisonString) {
  if (correctChars.length === 1) {
    timer.start();
  }
  if (correctChars.length === comparisonString.length) {
    timer.end();
  }
}

function numberOfWords(string) {
  var length = string.split(' ').length;
  return length;
}

function wordsPerMinute(time, string) {
  var numberWordsInPrompt = numberOfWords(string);
  var timeInMinutes = time/60;
  var wpm = Math.floor(numberWordsInPrompt/timeInMinutes);
  return wpm;
}
// VIEW
function renderString(id, string) {
  document.getElementById(id).innerText = string;
}

function renderSecondsElapsed(id, seconds) {
  document.getElementById(id).innerText = "Seconds Elapsed: " + seconds;
}

function renderWPM(id, wpm) {
  document.getElementById(id).innerText = "WPM: " + wpm;
}
