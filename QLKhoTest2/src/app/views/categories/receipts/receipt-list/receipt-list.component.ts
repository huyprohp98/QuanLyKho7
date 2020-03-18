import { Component, OnInit, HostListener } from '@angular/core';
import { Receipt } from '../../../../shared/models/receipt.model';
import { ReceiptService } from '../../../../shared/services/receipt-service';

import { ConfigConstant } from '../../../../shared/constants/config-constant';
import { MessageConstant } from 'src/app/shared/constants/message-constant';
import { NotifyService } from '../../../../shared/services/notify-service'
import { ReceiptModalComponent } from '../receipt-modal/receipt-modal.component';
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {

  listOfDataReceipt = [];
  constructor(private receiptService: ReceiptService, private notify: NotifyService,
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

    this.receiptService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Receipt[]>) => {

        this.pagination = res.pagination;

        this.listOfDataReceipt = res.result;
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
  update(receipt: Receipt) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin phiếu nhập',
      nzContent: ReceiptModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        receipt,
        isAddNew: false
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
    console.log(receipt);
  }

  delete(id: number) {

    //show message
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.receiptService.delete(id).subscribe((res: boolean) => {
        if (res) {
          this.loadData();
        }
      });
    })

    console.log(id);
  }
  addNew() {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới phiếu nhập',
      nzContent: ReceiptModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        receipt: { id: 0, name: "", creatdate: null, amount: null, price: "", content: "", staffId: null, staffName: "", inventoryId: null, inventoryName: "" },
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
