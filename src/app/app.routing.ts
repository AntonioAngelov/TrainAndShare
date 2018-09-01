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
import { ExerciseDetailsComponent } from './~exercises/exercise-details/exercise-details.component';
import { ExerciseGuard } from './~exercises/exercise.guard';
import { ExercisesBaseComponent } from './~exercises/exercises-base/exercises-base.component';
import { ExerciseCreateComponent } from './~exercises/exercise-create/exercise-create.component';
import { PublicTrainingsComponent } from './~trainings/public-trainings/public-trainings.component';
import { AuthGuard } from './authentication/guards/auth.guard';
import { AdminBaseComponent } from './~admin/admin-base/admin-base.component';
import { AdminActiveUsersComponent } from './~admin/admin-active-users/admin-active-users.component';
import { AdminLockedUsersComponent } from './~admin/admin-locked-users/admin-locked-users.component';
import { AdminGuard } from './~admin/admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'trainings',
    component: TrainingsBaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: CreateTrainingComponent
      },
      {
        path: 'public',
        component: PublicTrainingsComponent
      },
      {
        path: ':userId',
        canActivate: [UserTrainingsGuard],
        children: [
          {
            path: '',
            component: UserTrainingsComponent
          },
          {
            path: 'details/:trainingId',
            component: TrainingDetailsComponent
          }
        ]
      },
    ]
  },
  {
    path: 'exercises',
    component: ExercisesBaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':trainingId/create',
        component: ExerciseCreateComponent
      },
      {
        path: ':trainingId/:exerciseId',
        canActivate: [ExerciseGuard],
        component: ExerciseDetailsComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminBaseComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'users/active',
        canActivate: [AuthGuard, AdminGuard],
        component: AdminActiveUsersComponent
      }
      ,
      {
        path: 'users/locked',
        canActivate: [AuthGuard, AdminGuard],
        component: AdminLockedUsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
