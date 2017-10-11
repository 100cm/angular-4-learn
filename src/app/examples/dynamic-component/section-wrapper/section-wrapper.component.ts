import {Component, OnInit, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-section-wrapper',
  templateUrl: './section-wrapper.component.html',
  styleUrls: ['./section-wrapper.component.css']
})
export class SectionWrapperComponent implements OnInit {

  constructor(public view_container_ref:ViewContainerRef) { }

  ngOnInit() {
  }

}
