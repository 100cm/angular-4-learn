import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-boy',
  templateUrl: './boy.component.html',
  styleUrls: ['./boy.component.css']
})
export class BoyComponent implements OnInit {

  constructor() {
  }

  gift = '电动棒'

  ngOnInit() {
  }

  change_gift() {
    this.gift = '跳蛋'
  }

  get_message(message: string) {
    alert(message)
  }

}
