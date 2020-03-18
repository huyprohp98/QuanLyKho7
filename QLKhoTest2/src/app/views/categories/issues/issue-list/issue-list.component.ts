import { Component, OnInit, HostListener } from '@angular/core';
import { Issue } from '../../../../shared/models/issue.model';
import { IssueService } from '../../../../shared/services/issue-service';

import { ConfigConstant } from '../../../../shared/constants/config-constant';
import { MessageConstant } from 'src/app/shared/constants/message-constant';
import { NotifyService } from '../../../../shared/services/notify-service'
import { IssueModalComponent } from '../issue-modal/issue-modal.component';
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  listOfDataIssue = [];
  constructor(private issueService: IssueService, private notify: NotifyService,
    private modalService: NzModalService) { }
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10
  }

  pagingParams: PagingParams = {
    pageNumber: 1,
    pageSize: 5,
    keyword: '',
    sortKey: '',
    sortValue: '',
    searchKey: '',
    searchValue: ''
  };
  ngOnInit() {
    this.loadData();
  }
  loadData(reset: boolean = false): void {
    if (reset) {
      this.pagination.currentPage = 1;
    }

    this.issueService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Issue[]>) => {

        this.pagination = res.pagination;

        this.listOfDataIssue = res.result;
        console.log(res);
      });
  }
  search(keyword: string) {
    this.pagingParams.searchValue = "name";
    this.pagingParams.searchKey = keyword;
    this.loadData();
  }
  sort(sort: { key: string, value: string }): void {
    this.pagingParams.sortKey = sort.key;
    this.pagingParams.sortValue = sort.value;
    this.loadData();
  }
  update(issue: Issue) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin vật tư',
      nzContent: IssueModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        issue,
        isAddNew: false
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
    console.log(issue);
  }

  delete(id: number) {

    //show message
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.issueService.delete(id).subscribe((res: boolean) => {
        if (res) {
          this.loadData();
        }
      });
    })

    console.log(id);
  }
  addNew() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới vật tư',
      nzContent: IssueModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        issue: { id: 0, name: "", creatdate: null, amount: null, price: "", content: "", customerId: null, customerName: "", inventoryId: null, inventoryName: "" },
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
        console.log(result);
      }
    });
  }

}
