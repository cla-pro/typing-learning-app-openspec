import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-home-button',
    imports: [RouterLink, TranslateModule],
    templateUrl: './home-button.component.html',
    styleUrls: ['./home-button.component.css']
})
export class HomeButtonComponent {
  @Input() destination: string = '/';
}

