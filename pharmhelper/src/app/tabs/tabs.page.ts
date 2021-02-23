import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { globalProps } from '../globalProps';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  loading: any;

  constructor(
    public loadingController: LoadingController,
    private firestore: AngularFirestore,
  ) {
    firestore.collection('symptoms').valueChanges().subscribe(data => {
      if (data) {
        globalProps.symptomsData = data;
        data.forEach((el: any, index: number) => {
          globalProps.allSymptoms.push({
            name: el.name,
            id: el.id
          });
          el.synonims.forEach(element => {
            globalProps.allSymptoms.push({
              name: element,
              id: el.id
            })
          });
          if (data.length - 1 === index) {
            const observer = setInterval(() => {
              if (this.loading) {
                clearInterval(observer);
                setTimeout(() => {
                  this.loading.dismiss();
                }, 1000);
              }
            }, 100)
          }
        });
      }
    });

    firestore.collection('diseases').valueChanges().subscribe(data => {
      if (data) {
        globalProps.disData = data;
      }
    });

    firestore.collection('drugs').valueChanges().subscribe(data => {
      if (data) {
        globalProps.drugsData = data;
      }
    })
  }

  ngOnInit() {
    this.presentLoading();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Загрузка данных',
      duration: 2000
    });
    await this.loading.present();

    // const { role, data } = await this.loading.onDidDismiss();
  }

}
