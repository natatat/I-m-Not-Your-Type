var DataInterpreter = {
  keyPressed: function(keycode) {
    return String.fromCharCode(keycode)
  },

  numberOfWords: function(string) {
    var length = string.split(" ").length;
    return length;
  },

  wordsPerMinute: function(time, string) {
    var numberWordsInPrompt = this.numberOfWords(string);
    var timeInMinutes = time/60;
    var wpm = Math.floor(numberWordsInPrompt/timeInMinutes);
    return wpm;
  },

  accuracyRating: function(userTyped, actualText) {
    return Math.floor((actualText.length)/userTyped * 100);
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

  var StringManipulator = {
    concatenate: function(letter, string) {
      if (Checker.charCorrect(letter, string)) {
        correctChars = correctChars.concat(letter);
        setTimer(string);
        Render.string("text", correctChars);
      }
    },

    parse: function(testString) {
      var indivLetters = testString.split("")
      $("#highlighted-text").html('<span class="letters done" id="active">' + indivLetters[0] + '</span>')
      for (var i = 1; i < indivLetters.length; i++) {
        if (indivLetters[i] === " ") {
          $("#highlighted-text").append('<span class="spaces">' + indivLetters[i] + '</span>')
        } else {
          $("#highlighted-text").append('<span class="letters">' + indivLetters[i] + '</span>')
        }
      }
    },

    highlight: function() {
      $("#highlighted-text span:nth-child(" + (latestChar) + ")").addClass("done").attr("id", "active");
      $("#highlighted-text span:nth-child(" + (latestChar-1) + ")").removeAttr("id");
    }
  };

  var Checker = {
    isDone: function(testString){
      if (correctChars.length === testString.length) {
        correctChars = "";
        return true;
      }
      return false;
    },

    charCorrect: function(char, testString) {
      ++totalCharsPressed;
      if(char === testString[latestChar]) {
        ++latestChar;
        StringManipulator.highlight();
        return true;
      }
      return false;
    }
  };

  function gameLogic(event) {
    StringManipulator.concatenate(DataInterpreter.keyPressed(event.keyCode), testString);
    if (Checker.isDone(testString)) {
      var timeInSeconds = Math.floor((timer.endTime - timer.startTime) / 1000);
      var wpm = DataInterpreter.wordsPerMinute(timeInSeconds, testString);
      var accuracy = DataInterpreter.accuracyRating(totalCharsPressed,testString);
      Render.accuracy("accuracy", accuracy);
      Render.secondsElapsed("time-elapsed", timeInSeconds);
      Render.wordsPerMinute("wpm", wpm);
      $(".stats").removeClass("hidden");
    }
  };

  function setTimer(comparisonString) {
    if (correctChars.length === 1) {
      timer.start();
    }
    if (correctChars.length === comparisonString.length) {
      timer.end();
    }
  };

  function bindEventListeners() {
    document.addEventListener("keypress", gameLogic);
  };

  bindEventListeners();
  StringManipulator.parse(testString);

};