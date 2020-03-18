
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { Issue } from '../../../../shared/models/issue.model';
import { IssueService } from '../../../../shared/services/issue-service';
import { NotifyService } from '../../../../shared/services/notify-service';
import { MessageConstant } from '../../../../shared/constants/message-constant';
import { CustomerService } from '../../../../shared/services/customer-service'
import { InventoryService } from '../../../../shared/services/inventory-service'
import { Customer } from 'src/app/shared/models/customer.model';
import { Inventory } from 'src/app/shared/models/inventory.model';

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.scss']
})
export class IssueModalComponent implements OnInit {

  @Input() issue: Issue;
  @Input() isAddNew: boolean;
  IssueForm: FormGroup;
  loadingSaveChanges: boolean;
  listOfCustomers = [];
  listOfInventorys = [];
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private issueService: IssueService,
    private customerService: CustomerService,
    private inventoryService: InventoryService,
    private notify: NotifyService) { }

  ngOnInit() {
    this.loadCustomers();
    this.loadInventorys();
    this.createForm();
    this.IssueForm.reset();
    this.IssueForm.patchValue(this.issue);
  }

  createForm() {
    this.IssueForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      creatdate: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      price: [null, [Validators.required]],
      content: [null, [Validators.required]],
      customerId: [Validators.required],
      inventoryId: [Validators.required]
    });
  }
  loadCustomers() {
    this.customerService.getAll().subscribe((res: Customer[]) => {
      this.listOfCustomers = res;
      console.log(res);
    });
  }

  loadInventorys() {
    this.inventoryService.getAll().subscribe((res: Inventory[]) => {
      this.listOfInventorys = res;
      console.log(res);
    });
  }
  destroyModal() {
    this.modal.destroy(false);
  }
  saveChanges() {
    const issue = this.IssueForm.getRawValue();
    console.log(issue);

    if (this.isAddNew) {
      this.issueService.addNew(issue).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
    else {
      this.issueService.update(issue).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
  }

}
