import { Routes } from '@angular/router';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { ExerciseComponent } from '../components/exercise/exercise.component';
import { ExerciseNotFoundComponent } from '../components/exercise-not-found/exercise-not-found.component';
import { RewardGamesComponent } from '../components/reward-games/reward-games.component';
import { SettingsComponent } from '../components/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'reward-games',
    component: RewardGamesComponent
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
