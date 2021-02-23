import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ModalController } from '@ionic/angular';
import { globalProps } from '../globalProps';
import { ModalDrugComponent } from '../modal-drug/modal-drug.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  finded: boolean = false;
  options = {
    language: 'ru-RU',
    showPopup: false
  }
  recognizeState: boolean = false;
  modal: HTMLIonModalElement;

  constructor(
    private speechRecognition: SpeechRecognition,
    private cd: ChangeDetectorRef,
    public modalController: ModalController
  ) {}

  async presentModal(data: any) {
    this.modal = await this.modalController.create({
      component: ModalDrugComponent,
      cssClass: 'my-custom-class',
      componentProps: { 
        data: data
      }
    });
    return await this.modal.present();
  }

  bigBtn() {
    if (this.recognizeState) {
      this.stopRecognation();
    } else {
      this.startRecognation();
    }
  }

  startRecognation() {
    this.finded = false;
    this.speechRecognition.startListening(this.options)
    .subscribe(
      (matches: string[]) => {
        for (let i = 0; i < matches.length; i++) {
          if (matches[i].toLowerCase().includes('найди')) {
            for (let index = 0; index < globalProps.drugsData.length; index++) {
              if (matches[i].toLowerCase().includes(globalProps.drugsData[index].name.toLowerCase())) {
                this.presentModal(globalProps.drugsData[index].url);
                this.finded = true;
                this.recognizeState = false;
                break;
              }
            }
          }
          if (this.finded) break;
        }
        this.cd.detectChanges();
      },
      (onerror) => {
        this.recognizeState = false;
        console.log('error:', onerror);
        this.cd.detectChanges();
      },
      () => {
        this.recognizeState = false;
      }
    );
    this.recognizeState = true;
  }

  stopRecognation() {
    this.speechRecognition.stopListening().then(() => {
      this.recognizeState = false;
    })
  }

  ngOnInit() {
    //this.speechRecognition.isRecognitionAvailable().then((available: boolean) => this.message = available ? 'reday' : 'nooo..');
    // Request permissions
    this.speechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
    )
  }

}
