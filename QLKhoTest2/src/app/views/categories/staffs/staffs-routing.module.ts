import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StaffListComponent} from './staff-list/staff-list.component'

const routes: Routes = [
  {
      path: '',
      data: {
          breadcrumb: 'Nhân Viên'
      },
      children: [
          {
              path: 'danh-sach',
              component: StaffListComponent,
              data: {
                  breadcrumb: 'Danh sách'
              }
          },
          {
              path: '',
              redirectTo: 'danh-sach',
              pathMatch: 'full'
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule { }
