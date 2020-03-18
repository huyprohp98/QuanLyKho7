import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IssueListComponent} from './issue-list/issue-list.component'

const routes: Routes = [
  {
    path: '',
    data: {
        breadcrumb: 'Phiếu xuất'
    },
    children: [
        {
            path: 'danh-sach',
            component: IssueListComponent,
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
export class IssuesRoutingModule { }
