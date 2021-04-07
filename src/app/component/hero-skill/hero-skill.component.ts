import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-skill',
  templateUrl: './hero-skill.component.html',
  styleUrls: ['./hero-skill.component.scss'],
})
export class HeroSkillComponent implements OnInit {
  @Input() skillhero: any;
  
  constructor() { }

  ngOnInit() {}

}
