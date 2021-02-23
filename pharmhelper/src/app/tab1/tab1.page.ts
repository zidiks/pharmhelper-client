import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, IonSlides } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { globalProps } from '../globalProps';
import { ModalDrugComponent } from '../modal-drug/modal-drug.component';
import { ModalSubPage } from '../modal-sub/modal-sub.page'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('slider')  slides: IonSlides;

  currentAlg;
  queueAlgs = [];
  addedSymptsIds = [];
  
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
  lafalet: any;
  
  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    private afs: AngularFirestore
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

  async presentLafalet(data: any) {
    this.lafalet = await this.modalController.create({
      component: ModalDrugComponent,
      cssClass: 'my-custom-class2',
      componentProps: {
        data: data
      }
    });
    return await this.lafalet.present();
  }

  openDrug(data: any) {
    this.presentLafalet(globalProps.drugsData.find(el => el.id == data.id).url);
  }

  swipeNext(){
    this.slides.slideNext();
    this.slides.getActiveIndex().then(res => {
      globalProps.activeSlide = res;
      if (res === 1) {
        this.analysSymptoms();
      }
      if (res === 2) {
        this.analysQuestions();
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
    globalProps.questionSympts = [];
    const added = globalProps.addedSymptoms.map(el => el.sub.id);
    globalProps.disData.forEach(dis => {
      let warning = false;
      let count = 0;
      dis.symptoms.forEach(sympt => {
        if (added.includes(sympt.id)) {
          count += sympt.k;
          if  (!warning && sympt.warning) warning = true;
        }
      });
      if (count > 0) {
        globalProps.disPrev.push(Object.assign({count: count, w: warning}, dis));
        globalProps.questionSympts = globalProps.questionSympts.concat(dis.symptoms.filter(m => !added.includes(m.id)).map(e => Object.assign({state: false, disIndex: globalProps.disPrev.length - 1}, e)));
      };
    });
    globalProps.disPrev.sort((a,b) => b.count - a.count);
  }

  analysQuestions() {
    globalProps.questionSympts.forEach(el => {
      if (el.state === true) {
        globalProps.disPrev[el.disIndex].w = el.warning;
        globalProps.disPrev[el.disIndex].count += el.k;
        if (globalProps.addedSymptoms.find((s:any) => s.sub.id === el.id) === undefined) globalProps.addedSymptoms.push({
          parentID: el.id.split('-')[0],
          sub: el
        });
      }
    });
    this.addedSymptsIds = globalProps.addedSymptoms.map(m => m.sub.id);
    globalProps.disPrev.sort((a,b) => b.count - a.count);
    if (globalProps.disPrev.length > 0) {
      globalProps.disResult = globalProps.disPrev[0].name;
      this.currentAlg = Object.assign({}, globalProps.disPrev[0].algoritms);
      //console.log('current alg: ', this.currentAlg);
      this.nextAlg(0);
      if (globalProps.disPrev[0].w === true) this.presentWarning();
    } else {
      globalProps.disResult = 'Нет результатов';
    }
  }

  nextAlg(index: number) {
    this.queueAlgs.push(this.currentAlg);
    this.currentAlg = this.currentAlg.childs[index];
    if (this.currentAlg.type !== 'question') {
      this.currentAlg.childs.map(t => Object.assign(t, {count: 0}));
      this.currentAlg.childs.forEach((element:any, index:number) => {
        element.symptoms.forEach(symp => {
          if (this.addedSymptsIds.includes(symp.id)) element.count += 1;
        });
      });
      this.currentAlg.childs.sort((a,b) => b.count - a.count);
      this.nextAlg(0);
    } else {
      console.log('q');
    }
    setTimeout(() => {
      console.log('upd height');
      this.slides.updateAutoHeight(400);
    }, 150);
  }

  async presentWarning() {
    this.swipePrev();
    this.swipePrev();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Внимание!',
      message: 'Вам необходимо обратиться к врачу',
      backdropDismiss: false,
      buttons: [{
        text: 'OK'
      }]
    });

    await alert.present();
  }

  search() {
    this.autocomplete = this.gP.allSymptoms.filter(el => el.name.toLowerCase().includes(this.gP.symptInput.toLowerCase()) && !this.gP.addedIDs.has(el.id)).slice(0, 9);
  }

}
