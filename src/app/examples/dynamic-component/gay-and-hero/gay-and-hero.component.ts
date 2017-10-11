import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DynamicSectionService} from "../dynamic-section.service";
import {SectionWrapperComponent} from "../section-wrapper/section-wrapper.component";

@Component({
  selector: 'app-gay-and-hero',
  templateUrl: './gay-and-hero.component.html',
  styleUrls: ['./gay-and-hero.component.css']
})
export class GayAndHeroComponent implements OnInit {

  @ViewChild(SectionWrapperComponent)
  private SectionContainer: SectionWrapperComponent;


  constructor(private dynamic_section_service: DynamicSectionService) {
  }

  ngOnInit() {
  }

  add(type: string) {

    let content = {name: '我是gay吗', category: type}
    let section = this.dynamic_section_service.getSection(content)
    this.dynamic_section_service.loadComponent(this.SectionContainer.view_container_ref, section)

  }

}
