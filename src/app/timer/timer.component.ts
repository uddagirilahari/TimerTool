import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnDestroy{

  private timerSubscription!: Subscription;
  timeInSeconds: number = 300; // 5 minutes
  timeDisplay: string='';
  isTimerRunning: boolean = false;
  isStartDisabled: boolean = false;
  isPauseDisabled: boolean = true;
  isResumeDisabled: boolean = true;
  isResetDisabled : boolean = true;

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeInSeconds > 0) {
        this.timeInSeconds--;
        this.updateTimeDisplay();
      } else {
        this.stopTimer();
      }
    });
    this.isTimerRunning = true;
    this.isStartDisabled = true;
    this.isPauseDisabled = false;
    this.isResumeDisabled = true;
    this.isResetDisabled = false;
    
  }
  pauseTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.isTimerRunning = false;
      this.isPauseDisabled = true;
      this.isResumeDisabled = false;
      this.isResetDisabled = false;
    }
  }

  resumeTimer(): void {
    this.startTimer();
    this.isPauseDisabled = false;
    this.isResetDisabled = false;
  }

  resetTimer(): void {
    this.timeInSeconds = 300;
    this.updateTimeDisplay();
    this.pauseTimer();
    this.isStartDisabled = false;
    this.isPauseDisabled = true;
    this.isResumeDisabled = true;
    this.isResetDisabled = false;
  }

  updateTimeDisplay(): void {
    const minutes = Math.floor(this.timeInSeconds / 60);
    const seconds = this.timeInSeconds % 60;
    this.timeDisplay = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  stopTimer(): void {
    this.pauseTimer();
    this.isResumeDisabled=true;
    // Additional logic if needed when the timer stops
  }

  ngOnDestroy(): void {
    this.pauseTimer();
  }

}
