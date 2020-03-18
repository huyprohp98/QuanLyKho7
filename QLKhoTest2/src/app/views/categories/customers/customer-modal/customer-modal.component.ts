
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { CustomerService } from '../../../../shared/services/customer-service';
import { Customer } from '../../../../shared/models/customer.model';
import { NotifyService } from '../../../../shared/services/notify-service';
import { MessageConstant } from '../../../../shared/constants/message-constant';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent implements OnInit {

  @Input() customer: Customer;
  @Input() isAddNew: boolean;
  customerForm: FormGroup;
  loadingSaveChanges: boolean;
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private customerService: CustomerService,
    private notify: NotifyService) { }



  ngOnInit() {
    this.createForm();
    this.customerForm.reset();
    this.customerForm.patchValue(this.customer);
  }
  createForm() {
    this.customerForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone: [null, [Validators.required]]

    });
  }
  destroyModal() {
    console.log("huy");
    this.modal.destroy(false);
  }
  saveChanges() {
    const customer = this.customerForm.getRawValue();
    console.log(customer);

    if (this.isAddNew) {
      this.customerService.addNew(customer).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
    else {
      this.customerService.update(customer).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
  }

}
