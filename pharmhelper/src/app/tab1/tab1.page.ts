import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
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
  }

  dellAdded(index: number, id: string) {
    this.gP.addedSymptoms.splice(index, 1);
    this.gP.addedIDs.delete(id);
  }

  search() {
    this.autocomplete = this.gP.allSymptoms.filter(el => el.name.toLowerCase().includes(this.gP.symptInput.toLowerCase()) && !this.gP.addedIDs.has(el.id)).slice(0, 9);
  }

}
