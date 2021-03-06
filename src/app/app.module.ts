import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { TimerComponent } from './timer/timer.component';
import { IntervalComponent } from './interval/interval.component';
import { ListComponent } from './list/list.component';
import { AnimationFrameComponent } from './animation-frame/animation-frame.component';

@NgModule({
  declarations: [AppComponent, UsersComponent, TimerComponent, IntervalComponent, ListComponent, AnimationFrameComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
