/***************************************************
 * app.module
 * 
 * This file defines the components for the application.
 * 
 * Any components added to the project must be added
 * here to function correctly.
 * 
 **************************************************/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

//Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { EmployeesComponent } from './shared/widgets/admin/employees/employees.component'
import { AuthInterceptor } from './auth/authconfig.interceptor';
import { AdminComponent } from './modules/admin/admin.component';
import { AssociateComponent } from './modules/associate/associate.component';
import { SupervisorComponent } from './modules/supervisor/supervisor.component';
import { ErrorInterceptor } from './auth/error.interceptor';
import { SampleCardsComponent } from './modules/sample-cards/sample-cards.component';
import { SampleGraphqlComponent } from './modules/sample-graphql/sample-graphql.component';
import { GraphQLModule } from './graphql.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuoteListComponent } from './shared/widgets/associate/quote-list/quote-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    EmployeesComponent,
    AdminComponent,
    AssociateComponent,
    SupervisorComponent,
    SampleCardsComponent,
    SampleGraphqlComponent,
    QuoteListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    GraphQLModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory: (httpLink: HttpLink) => {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: httpLink.create({
    //         uri: 'https://48p1r2roz4.sse.codesandbox.io',
    //       }),
    //     };
    //   },
    //   deps: [HttpLink],
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
