import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HergosInfo } from 'src/app/_models/herosinfo';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.page.html',
  styleUrls: ['./hero-detail.page.scss'],
})
export class HeroDetailPage implements OnInit {

  herosinfo: HergosInfo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

    // Recebe os dados que vai ser editado
    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {

        // console.log(this.router.getCurrentNavigation().extras.state);

        this.herosinfo = this.router.getCurrentNavigation().extras.state.heroiInfo;

        console.log(this.herosinfo);
        

      }

    });
   }

  ngOnInit() {
  }

}
