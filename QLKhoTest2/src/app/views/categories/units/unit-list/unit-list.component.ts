import { Component, OnInit, HostListener } from '@angular/core';
import { Unit } from '../../../../shared/models/unit.model';
import { NotifyService } from '../../../../shared/services/notify-service'
import { UnitService } from '../../../../shared/services/unit-service';
import { ConfigConstant } from '../../../../shared/constants/config-constant';
import { MessageConstant } from 'src/app/shared/constants/message-constant';
import { UnitModalComponent } from '../unit-modal/unit-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';



@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  listOfData = [];

  constructor(private unitService: UnitService,
    private notify: NotifyService,
    private modalService: NzModalService) { }
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


    this.unitService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Unit[]>) => {

        this.pagination = res.pagination;
        this.listOfData = res.result;

        console.log(res);
      });
  }

  update(unit: Unit) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin đơn vị tính',
      nzContent: UnitModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzComponentParams: {
        unit,
        isAddNew: false
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });

    console.log(unit);
  }

  delete(id: number) {

    //show message
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.unitService.delete(id).subscribe((res: boolean) => {
        if (res) {
          this.loadData();
        }
      });
    })

    console.log(id);
  }
  addNew() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới đơn vị tính',
      nzContent: UnitModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        unit: { id: 0, name: "" },
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }
  getallunits() { 
    console.log("a");
  };
  onChangeUser(event) {
    console.log(event);
  }
}
