import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffsRoutingModule } from './staffs-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffModalComponent } from './staff-modal/staff-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [StaffListComponent, StaffModalComponent],
  imports: [
    CommonModule,
    StaffsRoutingModule,FormsModule, ReactiveFormsModule,NgZorroAntdModule
  ],
  entryComponents: [StaffModalComponent]
})
export class StaffsModule { }
