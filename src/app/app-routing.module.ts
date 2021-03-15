import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { AssociateComponent } from './modules/associate/associate.component';
import { SupervisorComponent } from './modules/supervisor/supervisor.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '#/:userID', component: DefaultComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
        data: { role: [1] } },
      { path: 'associate', component: AssociateComponent, canActivate: [AuthGuard],
        data: { role: [2] } },
      { path: 'supervisor', component: SupervisorComponent, canActivate: [AuthGuard],
        data: { role: [3] } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
