import { Component, OnInit } from '@angular/core';
import {CustomSection} from "../custom-section-interface";

@Component({
  selector: 'app-gay',
  templateUrl: './gay.component.html',
  styleUrls: ['./gay.component.css']
})
export class GayComponent implements OnInit,CustomSection {
  content: any;

  constructor() { }

  ngOnInit() {
  }

}
