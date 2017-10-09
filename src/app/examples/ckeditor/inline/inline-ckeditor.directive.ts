///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {Injectable, Directive, ElementRef, Input, Output, EventEmitter, forwardRef, Provider} from '@angular/core';
import {ckeditor_config} from "./ckeditor_config";

const CKEDITOR = window['CKEDITOR']
CKEDITOR.disableAutoInline = true;

@Directive({
  selector: '[inline-ckeditor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InlineCkeditorDirective),
      multi: true
    }
  ]
})
export class InlineCkeditorDirective {


  writeValue(obj: any): void {
    this.content = obj
    if (this.editor) {
      this.editor.setData(this.content)
    }
    this.onChange(obj)
  }

  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;


  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  constructor(public elm: ElementRef) {

  }

  @Input('id') id: string = ''

  @Input('content') content: string = ''

  editor: any

  editor_init = false

  @Output() content_change: EventEmitter<string> = new EventEmitter<string>()

  ngAfterViewChecked() {

  }

  ngOnInit() {
    this.create_editor()
  }

  ngAfterViewInit() {

  }

  create_editor() {

    let el = this.elm.nativeElement
    setTimeout(() => {
      let editor = CKEDITOR.inline(el, ckeditor_config);
      this.editor = editor
      this.editor.setData(this.content)
      editor.on('change', (evt) => {
        this.content = evt.editor.getData()
        this.onChange(this.content)
        this.content_change.emit(this.content)
      });

    }, 200)
    this.editor_init = true
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  }
}
