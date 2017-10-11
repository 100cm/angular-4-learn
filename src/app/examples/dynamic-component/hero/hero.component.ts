import { Component, OnInit } from '@angular/core';
import {CustomSection} from "../custom-section-interface";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit,CustomSection {

  content: any;

  constructor() { }

  ngOnInit() {
  }

}
