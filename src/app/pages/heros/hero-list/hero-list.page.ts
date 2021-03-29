import { HerosFirebaseService } from './../../../services/heros-firebase.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HergosInfo } from 'src/app/_models/herosinfo';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.page.html',
  styleUrls: ['./hero-list.page.scss'],
})
export class HeroListPage implements OnInit {

  HerosList  = [];
  searchList;
  isItemAvailable = false;

  constructor(
    private aptService: HerosFirebaseService,

  ) { }

  ngOnInit() {

    // load heros
    this.fetchHeros();

    let bookingRes = this.aptService.getAllHeros();
    bookingRes.snapshotChanges().subscribe(res => {
      this.HerosList = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.HerosList.push(a as HergosInfo);
      })

      console.log(this.HerosList);

      this.searchList = this.HerosList;

    })   
    
  }

  // buscar heros
  fetchHeros() {
    this.aptService.getAllHeros().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  getHeros(evt: any)
  {
    console.log(this.searchList);
    
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    console.log('search: ' + searchTerm);

    if (searchTerm) {

      this.isItemAvailable = true;
      this.HerosList = this.HerosList.filter((item) => {
        console.log(item);
        
        return item.heroi.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
      
      console.log(this.HerosList);
    }
  }

  clearSearch(env){
    console.log(this.searchList);
    
    this.HerosList = this.searchList;
  }
  

}
