
import { Component, OnInit, HostListener } from '@angular/core';
import { Staff } from '../../../../shared/models/staff.model';
import { NotifyService } from '../../../../shared/services/notify-service'
import { StaffService } from '../../../../shared/services/staff-service';
import { ConfigConstant } from '../../../../shared/constants/config-constant';
import { MessageConstant } from 'src/app/shared/constants/message-constant';
import { StaffModalComponent } from '../staff-modal/staff-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  listOfDataStaff = [];
  constructor(private staffService: StaffService,
    private notify: NotifyService,
    private modalService: NzModalService,
    ) { }
  searchColumn(searchKey: string) {
    this.pagingParams.searchKey = searchKey;
    this.loadData();
  }

  sort(sort: { key: string, value: string }): void {
    this.pagingParams.sortKey = sort.key;
    this.pagingParams.sortValue = sort.value;
    this.loadData();
  }

  search(keyword: string) {
    this.pagingParams.searchValue = "name";
    this.pagingParams.searchKey = keyword;
    this.loadData();
  }
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10
  }

  pagingParams: PagingParams = {
    pageNumber: 1,
    pageSize: 10,
    keyword: '',
    sortKey: '',
    sortValue: '',
    searchKey: '',
    searchValue: ''
  };

  ngOnInit() {
    this.loadData();
  }

  loadData() {


    this.staffService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Staff[]>) => {

        this.pagination = res.pagination;
        this.listOfDataStaff = res.result;

        console.log(res);
      });
  }

  update(staff: Staff) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin khách hàng',
      nzContent: StaffModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzComponentParams: {
        staff,
        isAddNew: false
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });

    console.log(staff);
  }

  delete(id: number) {

    //show message
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.staffService.delete(id).subscribe((res: boolean) => {
        if (res) {
          this.loadData();
        }
      });
    })

    console.log(id);
  }
  addNew() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới khách hàng',
      nzContent: StaffModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        staff: { id: 0, name: "",address:"",phone:null },
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }
  getallstaffs() { 
    console.log("a");
  };
  onChangeUser(event) {
    console.log(event);
  }

}
