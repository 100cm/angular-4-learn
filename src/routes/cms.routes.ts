import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {BoyComponent} from "../app/examples/chapter-1/boy/boy.component";
/**
 * Created by atyun on 7/25/17.
 */

const appRoutes: Routes = [

  {
    path: 'chapter-1', component: BoyComponent,

  },
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
