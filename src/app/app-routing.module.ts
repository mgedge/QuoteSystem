import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { RegisterComponent } from './register/register.component';
import { SpecialEventsComponent } from './special-events/special-events.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'special',
    component: SpecialEventsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '#',
    component: DefaultComponent,
    children: [{
      path: '',
      component: DashboardComponent
    },
    {
      path: 'posts',
      component: PostsComponent
    }]
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
