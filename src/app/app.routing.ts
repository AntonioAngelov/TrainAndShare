import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { UserTrainingsComponent } from './~trainings/user-trainings/user-trainings.component';
import { CreateTrainingComponent } from './~trainings/create/create.component';
import { TrainingsBaseComponent } from './~trainings/trainings-base/trainings-base.component';
import { UserTrainingsGuard } from './~trainings/user-trainings/user-trainings.guard';
import { TrainingDetailsComponent } from './~trainings/training-details/training-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'trainings',
    component: TrainingsBaseComponent,
    children: [
      {
        path: 'create',
        component: CreateTrainingComponent
      },
      {
        path: ':userId',
        canActivate: [UserTrainingsGuard],
        component: UserTrainingsComponent
      },
      {
        path: 'details/:trainingId',
        component: TrainingDetailsComponent
      }
    ]
   }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
