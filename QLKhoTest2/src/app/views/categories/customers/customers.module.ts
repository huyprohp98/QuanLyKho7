import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [CustomerListComponent, CustomerModalComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule, ReactiveFormsModule,NgZorroAntdModule
  ],
  entryComponents: [CustomerModalComponent]
})
export class CustomersModule { }
