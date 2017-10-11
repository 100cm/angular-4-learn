import {Injectable, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {CustomSection} from "./custom-section-interface";
import {SectionItem} from "./section-item";
import {SectionFactory} from "./section-factory";

@Injectable()
export class DynamicSectionService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  loadComponent(viewContainerRef: ViewContainerRef, sectionItem: SectionItem) {
    let componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(sectionItem.component);
    let componentRef = viewContainerRef.createComponent(componentFactory);
    let custom_section: CustomSection = <CustomSection>componentRef.instance;
    custom_section.content = sectionItem.data;
  }

  clearComponent(viewContainerRef: ViewContainerRef) {
    viewContainerRef.clear();
  }

  removeComponent(viewContainerRef: ViewContainerRef, index: number) {
    viewContainerRef.remove(index)
  }


  getAllSection(contents) {
    //构建工厂
    let section_factory = new SectionFactory()
    let sections = []
    sections = contents.map(content => {
      return new SectionItem(section_factory.get(content.category), content)
    })

    return sections
  }

  getSection(content){
    let section_factory = new SectionFactory()
    return new SectionItem(section_factory.get(content.category), content)
  }

}
