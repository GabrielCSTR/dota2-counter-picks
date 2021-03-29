import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class HerosFirebaseService {

  herosListRef: AngularFireList<any>;
  herokingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  getAllHeros() {
    this.herosListRef = this.db.list('/heros');
    return this.herosListRef;
  }

  getHero(id: string){
    this.herokingRef = this.db.object('/heros/' + id);
    return this.herokingRef;
  }
}
