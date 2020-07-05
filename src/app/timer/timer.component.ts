import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  showMsg = false;

  submit(): void {
    this.showMsg = true;
    setTimeout(() => (this.showMsg = false), 2000);
  }
}
