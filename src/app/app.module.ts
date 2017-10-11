import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InlineCkeditorDirective} from "./examples/ckeditor/inline/inline-ckeditor.directive";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BoyComponent} from './examples/chapter-1/boy/boy.component';
import {GirlComponent} from './examples/chapter-1/girl/girl.component';
import {routing} from "../routes/cms.routes";
import { GayComponent } from './examples/dynamic-component/gay/gay.component';
import { HeroComponent } from './examples/dynamic-component/hero/hero.component';
import { GayAndHeroComponent } from './examples/dynamic-component/gay-and-hero/gay-and-hero.component';
import {DynamicSectionService} from "./examples/dynamic-component/dynamic-section.service";
import { SectionWrapperComponent } from './examples/dynamic-component/section-wrapper/section-wrapper.component';
import { CkeditorExampleComponent } from './examples/ckeditor/ckeditor-example/ckeditor-example.component';

@NgModule({
  declarations: [
    AppComponent, InlineCkeditorDirective, BoyComponent, GirlComponent, GayComponent, HeroComponent, GayAndHeroComponent, SectionWrapperComponent, CkeditorExampleComponent
  ],
  imports: [
    routing,
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  entryComponents:[GayComponent,HeroComponent],
  providers: [ DynamicSectionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
