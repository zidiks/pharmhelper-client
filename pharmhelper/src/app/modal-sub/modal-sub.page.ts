import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-sub',
  templateUrl: './modal-sub.page.html',
  styleUrls: ['./modal-sub.page.scss'],
})
export class ModalSubPage implements OnInit {
  
  @Input() public data: any;
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

}
