import { HeroSkillComponent } from './../../../component/hero-skill/hero-skill.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeroDetailPageRoutingModule } from './hero-detail-routing.module';

import { HeroDetailPage } from './hero-detail.page';
import { HeroAtributesComponent } from 'src/app/component/hero-atributes/hero-atributes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeroDetailPageRoutingModule
  ],
  declarations: [HeroDetailPage, HeroAtributesComponent , HeroSkillComponent]
})
export class HeroDetailPageModule {}
