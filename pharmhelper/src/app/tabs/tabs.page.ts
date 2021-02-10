import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { globalProps } from '../globalProps';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private firestore: AngularFirestore,
  ) {
    firestore.collection('symptoms').valueChanges().subscribe(data => {
      if (data) {
        data.forEach((el: any) => {
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
        });
      }
    })
  }

}
