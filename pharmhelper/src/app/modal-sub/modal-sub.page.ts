import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { globalProps } from '../globalProps';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-modal-sub',
  templateUrl: './modal-sub.page.html',
  styleUrls: ['./modal-sub.page.scss'],
})
export class ModalSubPage implements OnInit {

  symptSubsData: any;

  @Input() public data: any;
  constructor(
    public toastController: ToastController,
    private modalCtrl: ModalController,
    private afs: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.afs.doc<any>(`symptoms/${this.data.sympt.id}`).valueChanges().subscribe(data => {
      if (data) {
        this.symptSubsData = data.sub;
      }
    });
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
