import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 25,
      break: 5,
      timer: 'Session',
      total: 1500,
      minutes: '25',
      seconds: '00',
      start: false,
      button: 'fas fa-play-circle fa-lg'
    };
    this.getTotal = this.getTotal.bind(this);
    this.getTime = this.getTime.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.keepTimer = this.keepTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  getTime() {
    var min = Math.floor(this.state.total / 60);
    var sec = this.state.total % 60;
    min = min.toString();
    sec = sec.toString();
    if (min.length < 2) {
      min = '0' + min;
    }
    if (sec.length < 2) {
      sec = '0' + sec;
    }
    this.setState({
      minutes: min,
      seconds: sec
    });
  }
  getTotal() {
    var totalSec = 0;
    if (this.state.timer == 'Session') {
      totalSec = this.state.session * 60;
    } else if (this.state.timer == 'Break') {
      totalSec = this.state.break * 60;
    }
    this.setState({
      total: totalSec
    }, () => {
      this.getTime();
    });
  }
  decreaseSession() {
    if (this.state.session > 1) {
      this.setState({
        session: this.state.session - 1
      }, () => {
        this.getTotal();
      });
    }
  }
  increaseSession() {
    if (this.state.session < 60) {
      this.setState({
        session: this.state.session + 1
      }, () => {
        this.getTotal();
      });
    }
  }
  decreaseBreak() {
    if (this.state.break > 1) {
      this.setState({
        break: this.state.break - 1
      }, () => {
        this.getTotal();
      });
    }
  }
  increaseBreak() {
    if (this.state.break < 60) {
      this.setState({
        break: this.state.break + 1
      }, () => {
        this.getTotal();
      });
    }
  }
  resetAll() {
    var beepAudio = document.getElementById('beep');
    beepAudio.load();
    this.setState({
      session: 25,
      break: 5,
      timer: 'Session',
      total: 1500,
      start: false,
      button: 'fas fa-play-circle fa-lg'
    }, () => {
      this.getTotal();
    });
  }
  keepTimer() {
    setTimeout(() => {
      if (this.state.start == true && this.state.total > 0) {
        this.setState({
          total: this.state.total - 1
        }, () => {
          this.getTime()
        });
        this.keepTimer();
      } else if (this.state.total == 0 && this.state.timer == 'Session') {
        var beepAudio = document.getElementById('beep');
        beepAudio.play();
        this.setState({
          timer: 'Break'
        }, () => {
          this.getTotal()
        });
        this.keepTimer();
      } else if (this.state.total == 0 && this.state.timer == 'Break') {
        var beepAudio = document.getElementById('beep');
        beepAudio.play();
        this.setState({
          timer: 'Session'
        }, () => {
          this.getTotal()
        });
        this.keepTimer();
      }
    }, 1000);
  }
  startTimer() {
    if (this.state.start == false) {
      this.setState({
        start: true,
        button: 'fas fa-pause-circle fa-lg'
      }, () => {
        this.keepTimer();
      });
    } else {
      this.setState({
        start: false,
        button: 'fas fa-play-circle fa-lg'
      });
    }
  }
  render() {
    return (
      <div id='app' class='d-flex flex-column'>
        <div id='title' class='border border-dark text-light bg-dark'><h1>25 + 5 Clock</h1></div>
        <div id='container' class='d-flex justify-content-around align-self-center'>
          <div id='session'>
            <div class='text-center row'>
              <div id='session-label' class='text-light bg-dark col-12'>Session Length</div>
              <div class='btn btn-success col-4 d-flex justify-content-center align-items-center' id='session-decrement' onClick={this.decreaseSession}><i class="fas fa-minus-circle fa-lg"></i></div>
              <div id='session-length' class='text-light bg-primary col-4'>{this.state.session}</div>
              <div class='btn btn-success col-4 d-flex justify-content-center align-items-center' id='session-increment' onClick={this.increaseSession}><i class="fas fa-plus-circle fa-lg"></i></div>
            </div>
          </div>
          <div id='break'>
            <div class='text-center row'>
              <div id='break-label' class='text-center text-light bg-dark col-12'>Break Length</div>
              <div class='btn btn-success col-4 d-flex justify-content-center align-items-center' id='break-decrement' onClick={this.decreaseBreak}><i class="fas fa-minus-circle fa-lg"></i></div>
              <div id='break-length' class='text-light bg-primary col-4'>{this.state.break}</div>
              <div class='btn btn-success col-4 d-flex justify-content-center align-items-center' id='break-increment' onClick={this.increaseBreak}><i class="fas fa-plus-circle fa-lg"></i></div>
            </div>
          </div>
        </div>
        <div id='timer' class='bg-dark text-center d-flex flex-column justify-content-center align-self-center'>
          <div class='text-center row' id='timer-container'>
            <audio id='beep' src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"></audio>
            <div id='timer-label' class='text-light bg-info col-12'>{this.state.timer}</div>
            <div id='time-left' class='text-light bg-dark col-12'>{this.state.minutes}:{this.state.seconds}</div>
            <div class='btn btn-danger col-6' id='reset' onClick={this.resetAll}>Reset</div>
            <div class='btn btn-info col-6 d-flex justify-content-center align-items-center' id='start_stop' onClick={this.startTimer}><i id='play' class={this.state.button}></i></div>
          </div>
        </div>
      </div>
    );
  }
};
ReactDOM.render(<Clock />, document.getElementById('root'));
