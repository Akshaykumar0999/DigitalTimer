// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {timeInMinutes: 25, timeElapsedInSeconds: 0, isTimeRunning: false}

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.TimerID)
  }

  timerIntervalDisplay = () => {
    const {timeInMinutes, timeElapsedInSeconds} = this.state
    const IsTimerCompleted = timeElapsedInSeconds === timeInMinutes * 60
    if (IsTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  resumeButton = () => {
    const {timeInMinutes, timeElapsedInSeconds, isTimeRunning} = this.state
    const IsTimerCompleted = timeElapsedInSeconds === timeInMinutes * 60
    if (IsTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimeInterval()
    } else {
      this.TimerID = setInterval(this.timerIntervalDisplay, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  resetButton = () => {
    this.clearTimeInterval()
    this.setState({
      timeInMinutes: 25,
      timeElapsedInSeconds: 0,
      isTimeRunning: false,
    })
  }

  decreasingTime = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 0) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  increasingTime = () => {
    this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
  }

  getTimeInMinutes = () => {
    const {timeInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timeInMinutes, isTimeRunning, timeElapsedInSeconds} = this.state
    const isDisabled = timeElapsedInSeconds > 0
    const timeStatus = isTimeRunning ? 'Running' : 'Paused'
    const imgUrls = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const imgAlts = isTimeRunning ? 'pause icon' : 'play icon'

    return (
      <div className="app-container">
        <h1 className="Title-name">Digital Timer</h1>
        <div className="clock-Operations-container">
          <div className="clock-display-container">
            <div className="Timer-Running-opp-card">
              <h1 className="Timer">{this.getTimeInMinutes()}</h1>
              <p className="Is-Running">{timeStatus}</p>
            </div>
          </div>
          <div className="clock-operations-container">
            <div className="pause-start-reset-container">
              <button
                type="button"
                className="icon-start-resume-card"
                onClick={this.resumeButton}
              >
                <img className="icon" src={imgUrls} alt={imgAlts} />
                <p className="titles-are">
                  {isTimeRunning ? 'Pause' : 'Start'}
                </p>
              </button>
              <button
                type="button"
                className="icon-start-resume-card"
                onClick={this.resetButton}
              >
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="titles-are">Reset</p>
              </button>
            </div>
            <p className="description">Set Timer Limit</p>
            <div className="icon-start-resume-card">
              <button
                type="button"
                className="plus-minus"
                onClick={this.decreasingTime}
                disabled={isDisabled}
              >
                -
              </button>
              <p className="time-indicates-card">{timeInMinutes}</p>
              <button
                type="button"
                className="plus-minus"
                onClick={this.increasingTime}
                disabled={isDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
