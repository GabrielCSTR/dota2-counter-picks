import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HerosInfo } from 'src/app/_models/herosinfo';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.page.html',
  styleUrls: ['./hero-detail.page.scss'],
})
export class HeroDetailPage implements OnInit {

  herosinfo: HerosInfo;
  skillhero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

   }

  ngOnInit() {

    // Recebe os dados que vai ser editado
    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state.heroiInfo && this.router.getCurrentNavigation().extras.state.skillInfo) {

        console.log('Query Params:', this.router.getCurrentNavigation().extras.state);

        this.herosinfo = this.router.getCurrentNavigation().extras.state.heroiInfo;
        this.skillhero = this.router.getCurrentNavigation().extras.state.skillInfo;

        console.log('Hero Infos:', this.herosinfo);
        console.log('Hero Skill:', this.skillhero);

      }

    });
  }

}
