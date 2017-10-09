import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-girl',
  templateUrl: './girl.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GirlComponent),
      multi: true
    }
  ],
  styleUrls: ['./girl.component.css']
})
export class GirlComponent implements OnInit {

  constructor() {
  }

  @Input() gift: string

  @Output() message: EventEmitter<string> = new EventEmitter()

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.gift = obj
  }

  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;


  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }


  reply() {
    let message = '喜欢'
    if (this.gift != '跳蛋') {
      message = '不喜欢'
    }
    this.message.emit(message)
  }

  change_gift() {
    this.gift = '洗刷刷'
    this.onChange(this.gift)
  }
}
