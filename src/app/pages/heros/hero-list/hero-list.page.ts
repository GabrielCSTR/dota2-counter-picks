import { HerosInfo } from './../../../_models/herosinfo';
import { DotabuffDBService } from './../../../services/dotabuff-db.service';
import { HerosFirebaseService } from './../../../services/heros-firebase.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tab1Root, Tab2Root, Tab3Root } from '../../';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.page.html',
  styleUrls: ['./hero-list.page.scss'],
})
export class HeroListPage implements OnInit {

  HerosList  = [];
  skillList  = [];

  searchList;
  isItemAvailable = false;

  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  
  DOTABUFFSCRAP = [];

  MAX_HEROS = 119;  // total heros

  constructor(
    private aptService: HerosFirebaseService,
    private router: Router,
    private service: DotabuffDBService

  ) { 

    // menus
    this.tab1Title = 'NEWS';
    this.tab2Title = 'HEROS';
    this.tab3Title = 'PICKS';

    // load db
    this.loadHeros();
  }

  // load db json
  loadHeros(){
	  this.service.load()
	  .then(data => {
      this.DOTABUFFSCRAP = data["heros"];
      console.log(this.DOTABUFFSCRAP);

      // salvando dados
      this.DOTABUFFSCRAP.forEach((item, index) => {
        if(index <= this.MAX_HEROS)
        {
          this.HerosList.push(item as HerosInfo);
        }
      });

      // organizar heros info
      this.heroisOrder(this.HerosList);
      // organizar keys heros vem desorganizada do backend
      this.HerosList.forEach((value, key) => {
        if(key <= this.MAX_HEROS) {
          //console.log(key, value);
          value.id = key;
          this.HerosList.push.apply(value as HerosInfo);
        }
      });

      // skills heros
      this.DOTABUFFSCRAP.forEach((item, index) => {
        if(index >= this.MAX_HEROS + 1)
        {
          this.skillList.push(item as HerosInfo);
        }
      });

      console.log(this.HerosList);
      console.log(this.skillList);
      
      
	  });
	}

  ngOnInit() {

    console.log(this.HerosList);
    
    this.searchList = this.HerosList;

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
  
  openHeroiDetail(hero: any){

    console.log('Hero Name:', hero.heroi);

    var skillinfo = [];

    // pega a skill do hero selecionado
    this.skillList.forEach(item =>{
      if(item.heroi.toLowerCase() == hero.heroi.toLowerCase())
      {
        skillinfo.push(item);
      }
    });
       
    const navigationExtras: NavigationExtras = {
      state: {
        heroiInfo: hero,
        skillInfo: skillinfo
       
      }
    };

    // Navega para a pagina de editar e passa os dados do user
    this.router.navigate(['hero-details/' + hero.id], navigationExtras);

  }

}
