
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { StockService } from '../../../../shared/services/stock-service';
import { Stock } from '../../../../shared/models/stock.model';
import { NotifyService } from '../../../../shared/services/notify-service';
import { MessageConstant } from '../../../../shared/constants/message-constant';
@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock-modal.component.html',
  styleUrls: ['./stock-modal.component.scss']
})
export class StockModalComponent implements OnInit {
  @Input() stock: Stock;
  @Input() isAddNew: boolean;
  stockForm: FormGroup;
  loadingSaveChanges: boolean;

  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private stockService: StockService,
    private notify: NotifyService) { }

    ngOnInit() {
      this.createForm();
      this.stockForm.reset();
      this.stockForm.patchValue(this.stock);
    }
    createForm() {
      this.stockForm = this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
        address: [null, [Validators.required]],
      });
    }
    destroyModal(){
      this.modal.destroy(false);
    }
    saveChanges(){
      const stock = this.stockForm.getRawValue();
      console.log(stock);
  
      if(this.isAddNew){
        this.stockService.addNew(stock).subscribe((res: any) => {
          if (res) {
            this.notify.success(MessageConstant.CREATED_OK_MSG);
            this.modal.destroy(true);
          }
  
          this.loadingSaveChanges = false;
        }, _ => this.loadingSaveChanges = false);
      }
      else{
        this.stockService.update(stock).subscribe((res: any) => {
          if (res) {
            this.notify.success(MessageConstant.CREATED_OK_MSG);
            this.modal.destroy(true);
          }
  
          this.loadingSaveChanges = false;
        }, _ => this.loadingSaveChanges = false);
      }
    }

}
