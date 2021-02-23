import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-drug',
  templateUrl: './modal-drug.component.html',
  styleUrls: ['./modal-drug.component.scss'],
})
export class ModalDrugComponent implements OnInit {
  drug: any;
  instr: any;
  url: any;
  @Input() public data: any;
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    fetch(this.data)
    .then(response => response.json())
    .then(result => {
      this.drug = result.data.drug;
      this.instr = result.data.instruction.paragraphs;
      console.log(result);
    });
  }

  dismiss(): void {
    this.modalCtrl.dismiss('test');
  }

}
