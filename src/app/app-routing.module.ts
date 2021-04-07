/***************************************************
 * app-routing.module
 * 
 * This file defines the routing for the application.
 * 
 * This file defines the routes the user may take in the
 * application. Additionally, this file will call the 
 * AuthGuard to determine if the user is permitted to
 * access the route.
 * 
 **************************************************/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './modules/admin/admin.component';
import { EmployeesComponent } from './shared/widgets/admin/employees/employees.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleAuthGuard } from './auth/role-auth.guard';
import { AssociateComponent } from './modules/associate/associate.component';
import { SupervisorComponent } from './modules/supervisor/supervisor.component';
import { SampleCardsComponent } from './modules/sample-cards/sample-cards.component';
import { SampleGraphqlComponent } from './modules/sample-graphql/sample-graphql.component';
import { VideoComponent } from './shared/widgets/demo/video/video.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '*', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //Sub paths once the user is logged in
  {
    path: '#', component: DefaultComponent, canActivate: [AuthGuard], 
    children: [
      {
        path: '', component: DashboardComponent, children: [
          { path: '', component: EmployeesComponent, outlet: 'users' }, 
        ]
      },
      {
        path: 'cards', component: SampleCardsComponent, children: [
          { path: '', component: EmployeesComponent, outlet: 'users' },
          { path: '', component: VideoComponent, outlet: 'video'},
        ]
      },
      { path: 'graphql', component: SampleGraphqlComponent },
      {
        path: 'admin', component: AdminComponent, canActivate: [RoleAuthGuard],
        data: { role: ['1'] }, children: [
          { path: '', component: EmployeesComponent, outlet: 'users' },

        ]
      },
      {
        path: 'supervisor', component: SupervisorComponent, canActivate: [AuthGuard],
        data: { role: ['2'] }, children: [
          { path: '', component: EmployeesComponent, outlet: 'users' },
        ]
      },
      {
        path: 'associate', component: AssociateComponent, canActivate: [AuthGuard],
        data: { role: ['3'] }, children: [
          { path: '', component: EmployeesComponent, outlet: 'users' },
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
