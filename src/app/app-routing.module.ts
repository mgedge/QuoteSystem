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
import { EmployeesComponent } from './shared/widgets/admin/employees/employees.component';
import { AuthGuard } from './auth/auth.guard';
import { AssociateComponent } from './modules/associate/associate.component';
import { SupervisorComponent } from './modules/supervisor/supervisor.component';
import { SampleCardsComponent } from './modules/sample-cards/sample-cards.component';
import { SampleGraphqlComponent } from './modules/sample-graphql/sample-graphql.component';
import { VideoComponent } from './shared/widgets/demo/video/video.component';
import { QuoteListComponent } from './shared/widgets/associate/quote-list/quote-list.component';
import { ViewUserComponent } from './shared/widgets/view-user/view-user.component';
import { EditUserComponent } from './shared/widgets/edit-user/edit-user.component';
import { ViewQuoteComponent } from './shared/widgets/view-quote/view-quote.component';
import { EditQuoteComponent } from './shared/widgets/edit-quote/edit-quote.component';
import { AdminComponent } from './modules/admin/admin.component';
import { ItemListComponent } from './shared/widgets/associate/item-list/item-list.component';
import { AddQuoteComponent } from './shared/widgets/associate/add-quote/add-quote.component';
import { CommissionsComponent } from './shared/widgets/commissions/commissions.component';
import { PrchseOrderComponent } from './shared/widgets/prchse-order/prchse-order.component';
import { QuoteCartComponent } from './shared/widgets/associate/quote-cart/quote-cart.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
        path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard],
        data: { role: ['1'] }
      },
      {
        path: 'edit-quote/:id', component: EditQuoteComponent, canActivate: [AuthGuard],
        data: { role: ['3'] }
      },
      {
        path: 'cards', component: SampleCardsComponent, children: [
          { path: '', component: EmployeesComponent, outlet: 'users' },
          { path: '', component: VideoComponent, outlet: 'video' },
        ]
      },
      { path: 'graphql', component: SampleGraphqlComponent },
      {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
        data: { role: ['1'] }, children: [
          { path: '', component: ViewUserComponent, outlet: 'users' },
          { path: '', component: CommissionsComponent, outlet: 'comms' }

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
          { path: '', component: AddQuoteComponent, outlet: 'new-quote'},
          { path: '', component: ViewQuoteComponent, outlet: 'view-quote'},
          { path: '', component: QuoteListComponent, outlet: 'quotes'},
          { path: '', component: ItemListComponent, outlet: 'items'},
          { path: '', component: ItemListComponent, outlet: 'parts'},
          { path: '', component: PrchseOrderComponent, outlet: 'prchse-order'},
          {
            path: '', component: AddQuoteComponent, outlet: 'new-quote',
            children: [
              { path: '', component: QuoteCartComponent, outlet: 'cart' },
            ]
          },
          { path: '', component: ViewQuoteComponent, outlet: 'view-quote' },
          { path: '', component: QuoteListComponent, outlet: 'quotes' },
          { path: '', component: ItemListComponent, outlet: 'items' },
          { path: '', component: ItemListComponent, outlet: 'parts' },
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
