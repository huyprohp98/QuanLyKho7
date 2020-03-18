
import { Inventory } from '../../../../shared/models/inventory.model';
import { InventoryService } from '../../../../shared/services/inventory-service';
import { Component, OnInit, HostListener } from '@angular/core';
import { ConfigConstant } from '../../../../shared/constants/config-constant';
import { MessageConstant } from 'src/app/shared/constants/message-constant';
import { NotifyService } from '../../../../shared/services/notify-service'
import { InventoryModalComponent } from '../inventory-modal/inventory-modal.component';
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  listOfDataInventory = [];
  constructor(private inventoryService: InventoryService, private notify: NotifyService,
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

    this.inventoryService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Inventory[]>) => {

        this.pagination = res.pagination;

        this.listOfDataInventory = res.result;
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
  update(inventory: Inventory) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin vật tư',
      nzContent: InventoryModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        inventory,
        isAddNew: false
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
    console.log(inventory);
  }

  delete(id: number) {

    //show message
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.inventoryService.delete(id).subscribe((res: boolean) => {
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
      nzContent: InventoryModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        inventory: { id: 0, name: "", price: "", amount : null, unitId: null, unitName: "", stockId: null, stockName: "" },
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
