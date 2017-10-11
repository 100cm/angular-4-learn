import {GayComponent} from "./gay/gay.component";
import {HeroComponent} from "./hero/hero.component";

const sections = {
  "gay": GayComponent,
  "hero": HeroComponent
}


export class SectionFactory {


  buildSection = (name, options) => {
    return sections[name](options)
  }

  get = (name) => {
    return sections[name]
  }

}

