
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { Inventory } from '../../../../shared/models/inventory.model';
import { InventoryService } from '../../../../shared/services/inventory-service';
import { NotifyService } from '../../../../shared/services/notify-service';
import { MessageConstant } from '../../../../shared/constants/message-constant';
import {UnitService} from '../../../../shared/services/unit-service'
import {StockService} from '../../../../shared/services/stock-service'
import { Stock } from 'src/app/shared/models/stock.model';
import { Unit } from 'src/app/shared/models/unit.model';
@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styleUrls: ['./inventory-modal.component.scss']
})
export class InventoryModalComponent implements OnInit {

  @Input() inventory: Inventory;
  @Input() isAddNew: boolean;
  inventoryForm: FormGroup;
  loadingSaveChanges: boolean;
  listOfUnits =[];
  listOfStocks =[];
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private inventoryService: InventoryService,
    private stockService : StockService,
    private unitService : UnitService,
    private notify: NotifyService) { }

ngOnInit() {
  this.loadUnits();
  this.loadStocks();
    this.createForm();
    this.inventoryForm.reset();
    this.inventoryForm.patchValue(this.inventory);
  }

createForm() {
    this.inventoryForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      unitId: [Validators.required],
      stockId: [Validators.required]
    });
  }
  loadUnits() {
    this.unitService.getAll().subscribe((res: Unit[]) => {     
      this.listOfUnits = res;
      console.log(res);
    });
  }

  loadStocks() {
    this.stockService.getAll().subscribe((res: Stock[]) => {     
      this.listOfStocks = res;
      console.log(res);
    });
  }
destroyModal(){
    this.modal.destroy(false);
  }
saveChanges(){
    const inventory = this.inventoryForm.getRawValue();
    console.log(inventory);

    if(this.isAddNew){
      this.inventoryService.addNew(inventory).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
    else{
      this.inventoryService.update(inventory).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
  }

}
