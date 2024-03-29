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
import { VideoComponent } from './widgets/demo/video/video.component';
import { QuoteListComponent } from './widgets/associate/quote-list/quote-list.component';
import { ItemListComponent } from './widgets/associate/item-list/item-list.component';
import { CommissionsComponent } from './widgets/commissions/commissions.component';
import { PrchseOrderComponent } from './widgets/prchse-order/prchse-order.component';
import { QuoteCartComponent } from './widgets/associate/quote-cart/quote-cart.component';
import { CustomersComponent } from './widgets/customers/customers.component';
import { EditQuoteComponent } from './widgets/edit-quote/edit-quote.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    EmployeesComponent,
    AddQuoteComponent,
    EditQuoteComponent,
    VideoComponent,
    QuoteListComponent,
    ItemListComponent,
    CommissionsComponent,
    PrchseOrderComponent,
    QuoteCartComponent,
    CustomersComponent,
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
  ]
})
export class SharedModule { }
