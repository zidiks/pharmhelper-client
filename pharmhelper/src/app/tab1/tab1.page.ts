import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { from } from 'rxjs';
import { globalProps } from '../globalProps';

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
  input = '';
  gP = globalProps;

  
  constructor() {
  }

  swipeNext(){
    this.slides.slideNext();
  }

  search() {
    this.autocomplete = this.gP.allSymptoms.filter(el => el.name.includes(this.input)).slice(0, 9);
  }

}
