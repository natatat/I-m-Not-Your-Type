var Helper = {
  keyPressed: function(keycode) {
    return String.fromCharCode(keycode)
  },

  numberOfWords: function(string) {
    var length = string.split(' ').length;
    return length;
  },

  wordsPerMinute: function(time, string) {
    var numberWordsInPrompt = this.numberOfWords(string);
    var timeInMinutes = time/60;
    var wpm = Math.floor(numberWordsInPrompt/timeInMinutes);
    return wpm;
  },

  accuracyRating: function(user_typed, actual_text) {
    return Math.floor((actual_text.length)/user_typed * 100);
  }
}

var Render = {
  string: function(id, string) {
    document.getElementById(id).innerText = string;
  },

  secondsElapsed: function(id, seconds) {
    document.getElementById(id).innerText = seconds;
  },

  wordsPerMinute: function(id, wpm) {
    document.getElementById(id).innerText = wpm;
  },

  accuracy: function(id, accuracy) {
    document.getElementById(id).innerText = accuracy;
  }
}

function startTyping() {

  var correctChars = "";
  var latestChar = 0;
  var totalCharsPressed = 0;
  var timer = new Timer();
  var testString = document.getElementById("test-string").innerText;

  bindEventListeners();
  parseStringToHighlight(testString);

  function gameLogic(event) {
    concatenatingString(Helper.keyPressed(event.keyCode), testString);
    if (isDone(testString)) {
      var timeInSeconds = Math.floor((timer.endTime - timer.startTime) / 1000);
      var wpm = Helper.wordsPerMinute(timeInSeconds, testString);
      var accuracy = Helper.accuracyRating(totalCharsPressed,testString);
      Render.accuracy("accuracy", accuracy);
      Render.secondsElapsed("time-elapsed", timeInSeconds);
      Render.wordsPerMinute("wpm", wpm);
      $(".stats").removeClass("hidden");
    }
  }

  function isDone(testString) {
    if (correctChars.length === testString.length) {
      correctChars = "";
      return true;
    }
    return false;
  }

  function checkCorrect(char, testString) {
    ++totalCharsPressed;
    if(char === testString[latestChar]) {
      ++latestChar;
      highlight();
      return true;
    }
    return false;
  }

  function parseStringToHighlight(testString) {
    var indivLetters = testString.split("")
    $("#highlighted-text").html('<span class="letters done" id="active">' + indivLetters[0] + '</span>')
    for (var i = 1; i < indivLetters.length; i++) {
      if (indivLetters[i] === " ") {
        $("#highlighted-text").append('<span class="spaces">' + indivLetters[i] + '</span>')
      } else {
        $("#highlighted-text").append('<span class="letters">' + indivLetters[i] + '</span>')
      }
    }
  }

  function highlight() {
    $("#highlighted-text span:nth-child(" + (latestChar) + ")").addClass("done").attr("id", "active");
    $("#highlighted-text span:nth-child(" + (latestChar-1) + ")").removeAttr("id");
  }

  function concatenatingString(letter, string) {
    if (checkCorrect(letter, string)) {
      correctChars = correctChars.concat(letter);
      setTimer(string);
      Render.string("text", correctChars);
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
    document.addEventListener("keypress", gameLogic);
  }

}