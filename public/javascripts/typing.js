function startTyping() {

  bindEventListeners();

  var correctChars = '';
  var nthChildCounter = 0;
  var latestChar = 0;
  var totalCharsPressed = 0;
  var timer = new Timer();
  var testString = document.getElementById("test-string").innerText;

  parseStringToHighlight(testString);
  createGirlRunsTable();

  function gameLogic(event) {
    concatenatingString(keyPressed(event.keyCode), testString);
    if (isDone(testString)) {
      var timeInSeconds = Math.floor((timer.endTime - timer.startTime) / 1000);
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
      highlight();
      girlRuns(testString);
      return true;
    }
    return false;
  }

  function parseStringToHighlight(testString) {
    var indivLetters = testString.split("")
    $("#highlighted-text").html('<span class= "letters" id="active">' + indivLetters[0] + '</span>')
    for (var i = 1; i < indivLetters.length; i++) {
      if (indivLetters[i] === " ") {
        $("#highlighted-text").append('<span class="spaces">' + indivLetters[i] + '</span>')
      } else {
        $("#highlighted-text").append('<span class="letters">' + indivLetters[i] + '</span>')
      }
    }
  }

  function createGirlRunsTable() {
    for (var i = 0; i < testString.length; i++) {
      $("#gurl-table").append("<td></td>");
    }
  }

  function highlight() {
    $("#highlighted-text span:nth-child(" + (latestChar + 1) + ")").attr("id", "active");
    $("#highlighted-text span:nth-child(" + (latestChar) + ")").removeAttr("id");
  }

  function girlRuns(testString) {
    ++nthChildCounter;
    updateGurlPosition();
  }

  function updateGurlPosition() {
    if (latestChar === testString.length) {
      $("#gurl-image td:nth-child(" + (nthChildCounter - 1) + ")").empty();
    } else {
    $("#gurl-image td:nth-child(" + nthChildCounter + ")").html('<img src="gurl.png" width="134px" height="179px">');
    $("#gurl-image td:nth-child(" + (nthChildCounter - 1) + ")").empty();
  }
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

  function bindEventListeners() {
    document.getElementById('typing-zone').addEventListener('keypress', gameLogic);
  }

  // VIEW RENDERERS

  function renderString(id, string) {
    document.getElementById(id).innerText = string;
  }

  function renderSecondsElapsed(id, seconds) {
    document.getElementById(id).innerText = "total seconds: " + seconds;
  }

  function renderWPM(id, wpm) {
    document.getElementById(id).innerText = "words per minute: " + wpm;
  }

  function renderAccuracy(id, accuracy) {
    document.getElementById(id).innerText = "accuracy: " + accuracy + "%";
  }

}

// HELPERS

function keyPressed(keycode) {
  return String.fromCharCode(keycode)
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
