
import { Stock } from '../../../../shared/models/stock.model';
import { StockService } from '../../../../shared/services/stock-service';
import { Component, OnInit, HostListener } from '@angular/core';
import { ConfigConstant } from '../../../../shared/constants/config-constant';
import { MessageConstant } from 'src/app/shared/constants/message-constant';
import { NotifyService } from '../../../../shared/services/notify-service';
import { StockModalComponent } from '../stock-modal/stock-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  listStockOfData = [];
  constructor(private stockService: StockService,
    private notify: NotifyService, private modalService: NzModalService) { }
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
  search(keyword: string) {
    this.pagingParams.searchValue = "name";
    //  this.pagingParams.searchValue = "address";
    this.pagingParams.searchKey = keyword;
    this.loadData();
  }
  searchColumn(searchKey: string) {
    this.pagingParams.searchKey = searchKey;
    this.loadData();
  }
  sort(sort: { key: string, value: string }): void {
    this.pagingParams.sortKey = sort.key;
    this.pagingParams.sortValue = sort.value;
    this.loadData();
  }

  ngOnInit() {
    this.loadData();
  }
  loadData(reset: boolean = false): void {
    if (reset) {
      this.pagination.currentPage = 1;
    }

    this.stockService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Stock[]>) => {

        this.pagination = res.pagination;

        this.listStockOfData = res.result;
        console.log(res);
      });
  }
  update(stock: Stock) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin tên kho',
      nzContent: StockModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        stock,
        isAddNew: false
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });

    console.log(stock);
  }



  delete(id: number) {

    //show message
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.stockService.delete(id).subscribe((res: boolean) => {
        if (res) {
          this.loadData();
        }
      });
    })

    console.log(id);
  }
  addNew() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới tên kho',
      nzContent: StockModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        stock: { id: 0, name: "", address: "" },
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }
  getallstocks() {
    console.log("a");
  };
  onChangeUser(event) {
    console.log(event);
  }

}


