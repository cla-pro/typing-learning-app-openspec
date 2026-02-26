import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-welcome',
    imports: [RouterLink],
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

