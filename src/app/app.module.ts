import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InlineCkeditorDirective} from "./examples/ckeditor/inline/inline-ckeditor.directive";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BoyComponent} from './examples/chapter-1/boy/boy.component';
import {GirlComponent} from './examples/chapter-1/girl/girl.component';
import {routing} from "../routes/cms.routes";

@NgModule({
  declarations: [
    AppComponent, InlineCkeditorDirective, BoyComponent, GirlComponent
  ],
  imports: [
    routing,
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
