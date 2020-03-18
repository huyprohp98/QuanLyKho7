import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueModalComponent } from './issue-modal/issue-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [IssueListComponent, IssueModalComponent],
  imports: [
    CommonModule,
    IssuesRoutingModule ,FormsModule, ReactiveFormsModule,NgZorroAntdModule
  ],
  entryComponents: [IssueModalComponent]
})
export class IssuesModule { }
