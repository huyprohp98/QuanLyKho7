
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { StaffService } from '../../../../shared/services/staff-service';
import { Staff } from '../../../../shared/models/staff.model';
import { NotifyService } from '../../../../shared/services/notify-service';
import { MessageConstant } from '../../../../shared/constants/message-constant';
@Component({
  selector: 'app-staff-modal',
  templateUrl: './staff-modal.component.html',
  styleUrls: ['./staff-modal.component.scss']
})
export class StaffModalComponent implements OnInit {

  @Input() staff: Staff;
  @Input() isAddNew: boolean;
  staffForm: FormGroup;
  loadingSaveChanges: boolean;
  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private staffService: StaffService,
    private notify: NotifyService) { }



  ngOnInit() {
    this.createForm();
    this.staffForm.reset();
    this.staffForm.patchValue(this.staff);
  }
  createForm() {
    this.staffForm = this.fb.group({
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
    const staff = this.staffForm.getRawValue();
    console.log(staff);

    if (this.isAddNew) {
      this.staffService.addNew(staff).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
    else {
      this.staffService.update(staff).subscribe((res: any) => {
        if (res) {
          this.notify.success(MessageConstant.CREATED_OK_MSG);
          this.modal.destroy(true);
        }

        this.loadingSaveChanges = false;
      }, _ => this.loadingSaveChanges = false);
    }
  }

}
