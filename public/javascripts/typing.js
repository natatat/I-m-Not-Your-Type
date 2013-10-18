function startTyping() {

  var correctChars = '';
  var latestChar = 0;
  var totalCharsPressed = 0;
  var timer = new Timer();
  var testString = document.getElementById("test").innerText;

  function gameLogic(event) {
    concatenatingString(keyPressed(event.keyCode), testString);
    if (isDone(testString)) {
      var timeInSeconds = (timer.endTime - timer.startTime) / 1000;
      var wpm = wordsPerMinute(timeInSeconds, testString);
      var accuracy = accuracyRating(totalCharsPressed,testString);
      renderAccuracy("accuracy", accuracy);
      renderSecondsElapsed("time-elapsed", timeInSeconds);
      renderWPM("wpm", wpm);
    }
  }

  function isDone(testString) {
    if (correctChars.length === testString.length) {
      correctChars = '';
      return true;
    }
    return false;
  }

  function checkCorrect(char, testString) {
    ++totalCharsPressed;
    if(char === testString[latestChar]) {
      ++latestChar;
      return true;
    }
    return false;
  }

  function keyPressed(keycode) {
    return String.fromCharCode(keycode);
  }

  function concatenatingString(letter, string) {
    if (checkCorrect(letter, string)) {
      correctChars = correctChars.concat(letter);
      setTimer(string);
      renderString("text", correctChars);
    }
  }

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

  function accuracyRating(user_typed, actual_text) {
    return Math.floor((actual_text.length)/user_typed * 100);
  }

  //VIEW

  function bindEventListeners() {
    document.getElementById('typing-zone').addEventListener('keypress', gameLogic);
  }

  function renderString(id, string) {
    document.getElementById(id).innerText = string;
  }

  function renderSecondsElapsed(id, seconds) {
    document.getElementById(id).innerText = "Seconds Elapsed: " + seconds;
  }

  function renderWPM(id, wpm) {
    document.getElementById(id).innerText = "WPM: " + wpm;
  }

  function renderAccuracy(id, accuracy) {
    document.getElementById(id).innerText = "Accuracy: " + accuracy + "%";
  }

  bindEventListeners();
}


window.onload = function() {
  startTyping();
}
