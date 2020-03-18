import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitsRoutingModule } from './units-routing.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitModalComponent } from './unit-modal/unit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [UnitListComponent, UnitModalComponent],
  imports: [
    CommonModule,
    UnitsRoutingModule,FormsModule, ReactiveFormsModule,NgZorroAntdModule
  ],
  entryComponents: [UnitModalComponent]
})
export class UnitsModule { }
