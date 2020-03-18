import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { Receipt } from '../../../../shared/models/receipt.model';
import { ReceiptService } from '../../../../shared/services/receipt-service';
import { NotifyService } from '../../../../shared/services/notify-service';
import { MessageConstant } from '../../../../shared/constants/message-constant';
import { StaffService } from '../../../../shared/services/staff-service';
import { InventoryService } from '../../../../shared/services/inventory-service'
import { Staff } from '../../../../shared/models/staff.model';
import { Inventory } from 'src/app/shared/models/inventory.model';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.scss']
})
export class ReceiptModalComponent implements OnInit {

  @Input() receipt: Receipt;
  @Input() isAddNew: boolean;
  ReceiptForm: FormGroup;
  loadingSaveChanges: boolean;
  listOfStaff = [];
  listOfInventorys = [];
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private receiptService: ReceiptService,
    private staffService: StaffService,
    private inventoryService: InventoryService,
    private notify: NotifyService) { }

  ngOnInit() {
    this.loadStaffs();
    this.loadInventorys();
    this.createForm();
    this.ReceiptForm.reset();
    this.ReceiptForm.patchValue(this.receipt);
  }

  createForm() {
    this.ReceiptForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      creatdate: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      price: [null, [Validators.required]],
      content: [null, [Validators.required]],
      staffId: [Validators.required],
      inventoryId: [Validators.required]
    });
  }
  loadStaffs() {
    this.staffService.getAll().subscribe((res: Staff[]) => {
      this.listOfStaff = res;
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
    const receipt = this.ReceiptForm.getRawValue();
    console.log(receipt);

    if (this.isAddNew) {
      this.receiptService.addNew(receipt).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
    else {
      this.receiptService.update(receipt).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
  }
}
