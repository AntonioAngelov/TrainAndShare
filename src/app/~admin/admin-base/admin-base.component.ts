import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { constructor } from 'q';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.css']
})
export class AdminBaseComponent implements OnInit {

  public masterTokenForm = new FormGroup(
    { MasterToken: new FormControl('') });

  constructor() { }

  ngOnInit() {
  }

  public saveMasterToken() {
    const token = this.masterTokenForm.value.MasterToken;

    localStorage.setItem('masterToken', token);

    this.masterTokenForm.reset();
  }

}
