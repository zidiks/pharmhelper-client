import { Component, ViewChild } from '@angular/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { globalProps } from '../globalProps';
import { ModalSubPage } from '../modal-sub/modal-sub.page'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('slider')  slides: IonSlides;
  
  slideOpts = {
    initialSlide: 0,
    autoHeight: true,
    allowTouchMove: false,
    speed: 400
  };
  autocomplete = [];
  autocompleteFocus = false;
  gP = globalProps;
  modal: any;
  
  constructor(
    public alertController: AlertController,
    public modalController: ModalController
  ) {
  }

  async presentModal(id: string) {
    this.modal = await this.modalController.create({
      component: ModalSubPage,
      cssClass: 'my-custom-class',
      componentProps: { 
        data: {
          sympt: this.gP.symptomsData.find(el => el.id == id)
        }
      }
    });
    return await this.modal.present();
  }

  swipeNext(){
    this.slides.slideNext();
    this.slides.getActiveIndex().then(res => {
      globalProps.activeSlide = res;
      if (res === 1) {
        this.analysSymptoms();
      }
    });
  }

  swipePrev(){
    this.slides.slidePrev();
    this.slides.getActiveIndex().then(res => {
      globalProps.activeSlide = res;
    });
  }

  dellAdded(index: number, id: string) {
    this.gP.addedSymptoms.splice(index, 1);
    this.gP.addedIDs.delete(id);
  }

  analysSymptoms() {
    globalProps.disPrev = [];
    let warning = false;
    console.log('start analys...');
    const added = globalProps.addedSymptoms.map(el => el.sub.id);
    globalProps.disData.forEach(dis => {
      let count = 0;
      dis.symptoms.forEach(sympt => {
        if (added.includes(sympt.id)) {
          count += sympt.k;
          if  (!warning && sympt.warning) warning = true; 
        }
      });
      if (count > 0) globalProps.disPrev.push(Object.assign({count: count}, dis));
    });
    globalProps.disPrev.sort((a,b) => a.count - b.count);
    console.log(globalProps.disPrev);
    globalProps.disResult = globalProps.disPrev.length > 0 ? !warning ? globalProps.disPrev[0].name : ' ' : 'Нет результатов';
    if (warning) this.presentWarning();
  }

  async presentWarning() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Внимание!',
      message: 'Вам необходимо обратиться к врачу',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.swipePrev();
        }
      }]
    });

    await alert.present();
  }

  search() {
    this.autocomplete = this.gP.allSymptoms.filter(el => el.name.toLowerCase().includes(this.gP.symptInput.toLowerCase()) && !this.gP.addedIDs.has(el.id)).slice(0, 9);
  }

}
