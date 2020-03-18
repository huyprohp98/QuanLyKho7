import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {InventoryListComponent} from './inventory-list/inventory-list.component'
const routes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Vật Tư'
        },
        children: [
            {
                path: 'danh-sach',
                component: InventoryListComponent,
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
export class InventoriesRoutingModule { }
