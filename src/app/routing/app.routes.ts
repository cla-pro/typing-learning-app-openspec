import { Routes } from '@angular/router';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { ExerciseComponent } from '../components/exercise/exercise.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'exercices/:id',
    component: ExerciseComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
