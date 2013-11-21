function Timer() {}

Timer.prototype = {
  startTime: 0,
  endTime: 0,
  start: function() {
    this.startTime = new Date().getTime();
  },
  end: function() {
    this.endTime = new Date().getTime();
  },
  duration: function() {
    if (this.startTime === 0) { return 0; }
    return (this.endTime || new Date().getTime()) - this.startTime;
  }
};
