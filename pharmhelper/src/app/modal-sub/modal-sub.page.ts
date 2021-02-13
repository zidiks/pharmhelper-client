import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { globalProps } from '../globalProps';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-sub',
  templateUrl: './modal-sub.page.html',
  styleUrls: ['./modal-sub.page.scss'],
})
export class ModalSubPage implements OnInit {
  
  @Input() public data: any;
  constructor(
    public toastController: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Симптом уже добавлен',
      duration: 2000
    });
    toast.present();
  }

  addSub(item: any) {
    if (!globalProps.addedSymptoms.some(el => el.sub.id === item.id)) {
      globalProps.addedSymptoms.push({
        parentID: this.data.sympt.id,
        sub: item
      });
      globalProps.symptInput = '';
      globalProps.addedIDs.add(this.data.sympt.id);
      this.dismiss();
    } else {
      this.presentToast();
    }
  }

  dismiss(): void {
    this.modalCtrl.dismiss('test');
  }

}
