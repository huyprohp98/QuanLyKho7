
import { Component, OnInit, HostListener } from '@angular/core';
import { Customer } from '../../../../shared/models/customer.model';
import { NotifyService } from '../../../../shared/services/notify-service'
import { CustomerService } from '../../../../shared/services/customer-service';
import { ConfigConstant } from '../../../../shared/constants/config-constant';
import { MessageConstant } from 'src/app/shared/constants/message-constant';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { Pagination, PaginatedResult } from '../../../../shared/models/pagination.model';
import { PagingParams } from '../../../../shared/params/paging-params.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  listOfDataCustomer = [];
  constructor(private customerService: CustomerService,
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


    this.customerService.getAllPaging(this.pagination.currentPage, this.pagination.itemsPerPage, this.pagingParams)
      .subscribe((res: PaginatedResult<Customer[]>) => {

        this.pagination = res.pagination;
        this.listOfDataCustomer = res.result;

        console.log(res);
      });
  }

  update(customer: Customer) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa thông tin khách hàng',
      nzContent: CustomerModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzComponentParams: {
        customer,
        isAddNew: false
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });

    console.log(customer);
  }

  delete(id: number) {

    //show message
    this.notify.confirm(MessageConstant.CONFIRM_DELETE_MSG, () => {
      this.customerService.delete(id).subscribe((res: boolean) => {
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
      nzContent: CustomerModalComponent,
      nzStyle: {
        top: ConfigConstant.MODAL_TOP_20PX
      },
      nzBodyStyle: {
        padding: ConfigConstant.MODAL_BODY_PADDING_HORIZONTAL
      },
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        customer: { id: 0, name: "",address:"",phone:null },
        isAddNew: true
      }
    });

    modal.afterClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }
  getallcustomers() { 
    console.log("a");
  };
  onChangeUser(event) {
    console.log(event);
  }

}
