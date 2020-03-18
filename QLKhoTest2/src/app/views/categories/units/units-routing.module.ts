import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {UnitListComponent} from './unit-list/unit-list.component'
const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Đơn vị tính'
        },
        children: [
            {
                path: 'danh-sach',
                component: UnitListComponent,
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
export class UnitsRoutingModule { }
