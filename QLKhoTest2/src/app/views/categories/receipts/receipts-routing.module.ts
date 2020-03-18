import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReceiptListComponent} from './receipt-list/receipt-list.component'

const routes: Routes = [
  {
    path: '',
    data: {
        breadcrumb: 'Phiếu nhập'
    },
    children: [
        {
            path: 'danh-sach',
            component: ReceiptListComponent,
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
export class ReceiptsRoutingModule { }
