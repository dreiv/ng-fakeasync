import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-frame',
  templateUrl: './animation-frame.component.html',
  styleUrls: ['./animation-frame.component.css']
})
export class AnimationFrameComponent implements OnInit {
  value = '';

  constructor() {}

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.value = 'requestAnimationFrame';
    });
  }
}
