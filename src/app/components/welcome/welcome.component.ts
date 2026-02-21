import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  exercises = [
    { id: 'basic-typing', name: '🔤 Basic Typing' },
    { id: 'speed-test', name: '⚡ Speed Test' },
    { id: 'accuracy-training', name: '🎯 Accuracy Training' }
  ];
}

