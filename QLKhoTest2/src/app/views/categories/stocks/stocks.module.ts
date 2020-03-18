import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockModalComponent } from './stock-modal/stock-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [StockListComponent, StockModalComponent],
  imports: [
    CommonModule,
    StocksRoutingModule,FormsModule, ReactiveFormsModule,NgZorroAntdModule
  ],
  entryComponents: [StockModalComponent]
})
export class StocksModule { }
