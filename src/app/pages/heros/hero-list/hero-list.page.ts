import { HerosFirebaseService } from './../../../services/heros-firebase.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { HergosInfo } from 'src/app/_models/herosinfo';
import { Tab1Root, Tab2Root, Tab3Root } from '../../';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.page.html',
  styleUrls: ['./hero-list.page.scss'],
})
export class HeroListPage implements OnInit {

  HerosList  = [];
  searchList;
  isItemAvailable = false;

  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  
  constructor(
    private aptService: HerosFirebaseService,
    private router: Router,

  ) { 

    this.tab1Title = 'NEWS';
    this.tab2Title = 'HEROS';
    this.tab3Title = 'PICKS';
  }

  ngOnInit() {

    // load heros
    //this.fetchHeros();

    let bookingRes = this.aptService.getAllHeros();

    bookingRes.snapshotChanges().subscribe(res => {
      this.HerosList = []; //clear
     
      //salvando heros
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['id'] = item.key;
        this.HerosList.push(a as HergosInfo);
      });

      // organizar heros
      this.heroisOrder(this.HerosList);
      // organizar keys heros vem desorganizada do backend
      this.HerosList.forEach((value, key) => {
        //console.log(key, value);
        value.id = key;
        this.HerosList.push.apply(value as HergosInfo);

      });
      // log
      console.log(this.HerosList);
      

      this.searchList = this.HerosList;

    })   
    
  }

  // hordenar lista de herois por ordem alfabetica 
  heroisOrder(arrayObj){
    return arrayObj.sort(function(objA,objB) {
      var a = objA.heroi.toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c").replace(/[^a-z0-9]/gi,'')
      var b = objB.heroi.toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c").replace(/[^a-z0-9]/gi,'')
      return a < b ? -1 : a > b ? 1 : 0;
    })
  }

  // buscar heros
  fetchHeros() {
    this.aptService.getAllHeros().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  // searchbar
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

  // clear search bar
  clearSearch(env){
    console.log(this.searchList);
    
    this.HerosList = this.searchList;
  }
  
  openHeroiDetail(heroi: any){

    console.log(heroi);
    
    const navigationExtras: NavigationExtras = {
      state: {
        heroiInfo: heroi
      }
    };

    // Navega para a pagina de editar e passa os dados do user
    this.router.navigate(['hero-details/' + heroi.id], navigationExtras);

  }

}
