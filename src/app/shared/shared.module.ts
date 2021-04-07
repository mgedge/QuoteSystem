import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { EmployeesComponent } from './widgets/admin/employees/employees.component';
import { AddQuoteComponent } from './widgets/associate/add-quote/add-quote.component';
import { EditQuoteComponent } from './widgets/supervisor/edit-quote/edit-quote.component';
import { VideoComponent } from './widgets/demo/video/video.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    EmployeesComponent,
    AddQuoteComponent,
    EditQuoteComponent,
    VideoComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
