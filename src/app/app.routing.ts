import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { UserTrainingsComponent } from './~trainings/user-trainings/user-trainings.component';
import { CreateTrainingComponent } from './~trainings/create/create.component';
import { UserTrainingsGuard } from './~trainings/user-trainings/user-trainings.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'trainings',
    children: [
      {
        path: ':userId',
        canActivate: [UserTrainingsGuard],
        component: UserTrainingsComponent
      },
      {
        path: 'create',
        component: CreateTrainingComponent
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
