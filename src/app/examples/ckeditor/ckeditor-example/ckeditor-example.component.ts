import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ckeditor-example',
  templateUrl: './ckeditor-example.component.html',
  styleUrls: ['./ckeditor-example.component.css']
})
export class CkeditorExampleComponent implements OnInit {

  title = 'app';
  ckeditor_content = '<p>hello ckeditor</p>'

  constructor() { }

  ngOnInit() {
  }

}
