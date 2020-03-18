import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptsRoutingModule } from './receipts-routing.module';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { ReceiptModalComponent } from './receipt-modal/receipt-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [ReceiptListComponent, ReceiptModalComponent],
  imports: [
    CommonModule,
    ReceiptsRoutingModule,
    FormsModule, ReactiveFormsModule,NgZorroAntdModule
  ],
  entryComponents: [ReceiptModalComponent]
})
export class ReceiptsModule { }
