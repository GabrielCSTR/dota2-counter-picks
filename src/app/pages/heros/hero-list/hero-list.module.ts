import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeroListPageRoutingModule } from './hero-list-routing.module';

import { HeroListPage } from './hero-list.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HeroListPageRoutingModule
  ],
  declarations: [HeroListPage]
})
export class HeroListPageModule {}
