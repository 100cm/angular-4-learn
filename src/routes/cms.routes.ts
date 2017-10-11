import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {BoyComponent} from "../app/examples/chapter-1/boy/boy.component";
import {GayAndHeroComponent} from "../app/examples/dynamic-component/gay-and-hero/gay-and-hero.component";
import {CkeditorExampleComponent} from "../app/examples/ckeditor/ckeditor-example/ckeditor-example.component";

/**
 * Created by atyun on 7/25/17.
 */

const appRoutes: Routes = [

  {
    path: 'chapter-1', component: BoyComponent,


  }, {
    path: 'dynamic-component', component: GayAndHeroComponent
  },
  {
    path: 'ckeditor', component: CkeditorExampleComponent
  }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
