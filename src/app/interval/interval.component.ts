import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css']
})
export class IntervalComponent implements OnInit {
  progress = 0;

  ngOnInit(): void {
    const id = setInterval(() => {
      this.progress += 50;

      if (this.progress === 100) {
        clearInterval(id);
      }
    }, 1000);
  }
}
