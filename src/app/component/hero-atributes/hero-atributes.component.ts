import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-atributes',
  templateUrl: './hero-atributes.component.html',
  styleUrls: ['./hero-atributes.component.scss'],
})
export class HeroAtributesComponent implements OnInit {
  @Input() herosinfo: any;
  
  constructor() {}

  ngOnInit() {}

}
