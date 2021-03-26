import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CardComponent } from './widgets/card/card.component';
import { EmployeesComponent } from './widgets/admin/employees/employees.component';
import { AddQuoteComponent } from './widgets/associate/add-quote/add-quote.component';
import { EditQuoteComponent } from './widgets/supervisor/edit-quote/edit-quote.component';
import { YoutubeComponent } from './widgets/demo/youtube/youtube.component';
import { LizbethComponent } from './widgets/demo/lizbeth/lizbeth.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CardComponent,
    EmployeesComponent,
    AddQuoteComponent,
    EditQuoteComponent,
    YoutubeComponent,
    LizbethComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CardComponent
  ]
})
export class SharedModule { }
