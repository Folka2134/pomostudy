import React from 'react';
import timerDone from "../../audio/timer-done.mp3"
import SettingsModal from "../settings-modal/settings-modal"

import "./pomobar.styles.scss"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      workValue: '',
      breakValue: '',
      currentSession: '',
      currentMinutes: null,
      currentSeconds: null,
      currentButton: {
        func: () => this.countDown(),
        action: 'play'
      },
      isModalOpen: false,
      settingsFormError: false
    };
    this.timer = null;
    this.workTimer = this.state.workValue * 60;
    this.breakTimer = this.state.breakValue * 60;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.playTimer = this.playTimer.bind(this);
  }

  renderWorkValue(workValue) {
    if (workValue) {
      workValue = localStorage.setItem('workValue', JSON.stringify(Number(workValue))) 
    } else {
        workValue = null
    }
    return JSON.parse(localStorage.getItem('workValue')) || 25;
  }

  renderBreakValue(breakValue) {
    if (breakValue) {
      localStorage.setItem('breakValue', JSON.stringify(Number(breakValue)))
    } else {
      breakValue = null
    }
    return JSON.parse(localStorage.getItem('breakValue')) || 5;;
  }

  playTimer() {

    if (this.workTimer > 0) {
      this.workTimer--;
      this.setState({
        currentMinutes: parseInt(this.workTimer / 60, 10),
        currentSeconds: parseInt(this.workTimer % 60, 10)
      });
    }
    else {

      if (this.breakTimer === this.renderBreakValue() * 60 && this.state.currentMinutes === 0 && this.state.currentSeconds === 0) {
        document.querySelector('.audio').play();
        this.setState({
          currentMinutes: this.renderBreakValue(),
          currentSeconds: 0,
          currentSession: 'Break'
        });
      }
      else {

        if (this.breakTimer > 0) {
          this.breakTimer--;
          this.setState({
            currentMinutes: parseInt(this.breakTimer / 60, 10),
            currentSeconds: parseInt(this.breakTimer % 60, 10)
          });
        }
        else {
          document.querySelector('.audio').play();
          clearInterval(this.timer);
          this.workTimer = this.renderWorkValue() * 60;
          this.breakTimer = this.renderBreakValue() * 60;
          this.setState({
            currentMinutes: this.workTimer / 60,
            currentSeconds: this.workTimer % 60,
            currentSession: 'Work'
          });
          this.countDown();
        }
      }
    }

    document.title = `${this.state.currentSession} ??? ${this.state.currentMinutes < 10 ? '0' + this.state.currentMinutes : this.state.currentMinutes}:${this.state.currentSeconds < 10 ? '0' + this.state.currentSeconds : this.state.currentSeconds}`;
  }

  countDown() {
    this.timer = setInterval(this.playTimer, 1000);
    this.setState({
      currentButton: {
        func: () => this.pauseTimer(),
        action: 'pause'
      }
    });
  }

  pauseTimer() {
    clearInterval(this.timer);
    document.querySelector('.audio').pause();
    this.setState({
      currentButton: {
        func: () => this.countDown(),
        action: 'play'
      }
    });
  }

  resetTimer(workValue, breakValue) {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({
      workValue: workValue,
      breakValue: breakValue,
      currentSession: 'Work',
      currentMinutes: workValue,
      currentSeconds: 0,
      currentButton: {
        func: () => this.countDown(),
        action: 'play'
      }
    });

    document.querySelector('.audio').pause();
    document.querySelector('.audio').currentTime = 0;
    this.workTimer = workValue * 60;
    this.breakTimer = breakValue * 60;
    document.title = 'Pomodoro Timer';
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event, workValue, breakValue) {
    event.preventDefault();

    if (!isNaN(workValue) && !isNaN(breakValue) && workValue >= 1 && workValue <= 60 && breakValue >= 1 && breakValue <= 60) {
      this.setState({
        settingsFormError: false
      });
      this.resetTimer(this.renderWorkValue(workValue), this.renderBreakValue(breakValue));
      this.showModal(false);
    }
    else {
      this.setState({
        settingsFormError: true
      });
    }
  }

  showModal(status) {
    this.setState({
      workValue: this.renderWorkValue(),
      breakValue: this.renderBreakValue(),
      isModalOpen: status,
      settingsFormError: false
    });
  }

  componentDidMount() {
    this.resetTimer(this.renderWorkValue(), this.renderBreakValue());

    window.addEventListener('click', event => {

      if (event.target.id === 'modal') {
        this.showModal(false);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <main className="pomo-bar">
          <h1 className="title">?????????</h1>
          <div className="pomo-container">
            {this.state.isModalOpen ? <SettingsModal workValue={this.state.workValue} breakValue={this.state.breakValue} handleChange={this.handleChange} handleSubmit={this.handleSubmit} settingsFormError={this.state.settingsFormError} showModal={this.showModal} /> : null}
            <div className="btn-counter">
              <button type="button" className="pomo-button timer-button" onClick={this.state.currentButton.func} aria-label={this.state.currentButton.action} title={this.state.currentButton.action.replace(this.state.currentButton.action.charAt(0), this.state.currentButton.action.charAt(0).toUpperCase())}>
                <span className={`fa fa-${this.state.currentButton.action} fa-lg timer-icon`}>???</span>
              </button>
              {/* <button type="button" className="button timer-button" onClick={() => this.resetTimer(this.renderWorkValue(), this.renderBreakValue())} aria-label="reset" title="Reset">
                <span className="fa fa-redo-alt fa-lg timer-icon">Pause</span>
              </button> */}

              <div className="timer-container">
                <h2>{`${this.state.currentSession}`}</h2>
                <div className="timer">{this.state.currentMinutes < 10 ? `0${this.state.currentMinutes}` : this.state.currentMinutes}:{this.state.currentSeconds < 10 ? `0${this.state.currentSeconds}` : this.state.currentSeconds}</div>
              </div>
              
              <button type="button" className="button pomo-button settings-button" onClick={() => this.showModal(true)} aria-label="Settings" title="Settings">
                <span className="fa fa-cog settings-icon">???</span>
              </button>
            </div>
          </div>
          <audio src={timerDone} className="audio" />
        </main>
        {/* <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer> */}
      </React.Fragment>
    );
  }
}

export default App;
