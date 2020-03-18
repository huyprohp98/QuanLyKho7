import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { UnitService } from '../../../../shared/services/unit-service';
import { Unit } from '../../../../shared/models/unit.model';
import { NotifyService } from '../../../../shared/services/notify-service';
import { MessageConstant } from '../../../../shared/constants/message-constant';



@Component({
  selector: 'app-unit-modal',
  templateUrl: './unit-modal.component.html',
  styleUrls: ['./unit-modal.component.scss']
})
export class UnitModalComponent implements OnInit {
  @Input() unit: Unit;
  @Input() isAddNew: boolean;
  unitForm: FormGroup;
  loadingSaveChanges: boolean;
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private unitService: UnitService,
    private notify: NotifyService) { }

  

  ngOnInit() {
    // this.unitForm =this.fb.group(
    //   {
    //     id:[null],
    //     name:[null,[Validators.required]]
       
    //   }
    // cai lỗi lol đừng lặp lại )
    this.createForm();
    this.unitForm.reset();
    this.unitForm.patchValue(this.unit);
  }
  createForm() {
    this.unitForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]]
      // createdDate: [null],
      // createdBy: [null],
      // status: [null] đoạn này nếu không có các trường này thì bỏ
    });
  }
  destroyModal(){
    console.log("huy");
    this.modal.destroy(false);
  }
  saveChanges(){
    const unit = this.unitForm.getRawValue();
    console.log(unit);

    if(this.isAddNew){
      this.unitService.addNew(unit).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
    else{
      this.unitService.update(unit).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
  }

}
