import { Component, OnInit, Input, Optional, Host, SkipSelf } from '@angular/core';
import {
    ControlContainer,
    FormGroupName,
    AbstractFormGroupDirective,
    FormGroupDirective,
    FormArrayName,
    AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-form-control-messages',
  templateUrl: './form-control-message.component.html',
  styleUrls: ['./form-control-message.component.css']
})
export class FormControlMessageComponent implements OnInit {

    public id: string;

    @Input()
    public parentId: string;

    @Input() public control: AbstractControl;

    @Input('controlName')
    public controlName: string;

    @Input() public color: '-rose-1' | 'white' = '-rose-1';

    public get isRed(): boolean {
        return this.color === '-rose-1';
    }

    private parent: ControlContainer;

    constructor(@Optional() @Host() @SkipSelf() parent: ControlContainer) {
        this.parent = parent;
    }

    public ngOnInit() {
        if ((this.control === null || this.control === undefined) && this.controlName) {
            this.checkParentType();

            this.control = this.parent.control.get(this.controlName);
        }
    }

    public get errorMessage(): string {
        if (this.control && this.control.touched && this.control.errors) {
           return 'Error';
        }

        return null;
    }

    private checkParentType(): void {
        if (!(this.parent instanceof FormGroupName) &&
            this.parent instanceof AbstractFormGroupDirective) {
            throw new Error(
                `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
                that also have a "form" prefix: formGroupName, formArrayName, or formGroup.`);
        } else if (
            !(this.parent instanceof FormGroupName) && !(this.parent instanceof FormGroupDirective) &&
            !(this.parent instanceof FormArrayName)) {
            throw new Error(
                `formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup
                directive and pass it an existing FormGroup instance (you can create one in your class).`);
        }
    }
}
