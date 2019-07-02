import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Item {
  nombre: string;
  url: string;
  fechaSubida: string;
}

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('img', ref => ref.orderBy('fechaSubida', 'desc')
    );
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
  }
}
