import { Routes } from '@angular/router';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { ExerciseComponent } from '../components/exercise/exercise.component';
import { ExerciseNotFoundComponent } from '../components/exercise-not-found/exercise-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'exercices/not-found',
    component: ExerciseNotFoundComponent
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
