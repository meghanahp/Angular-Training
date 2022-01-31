import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, SimpleChange } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MaskDataType, MaskState } from 'src/app/models';

@Directive({
  selector: '[mask]'
})
export class MaskDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() mask;
  @Input() maskPattern;
  @Input() dataType;
  unmaskedValue = '';
  allowedPattern: RegExp;
  @Input() maxlength;
  numOfSpecialChars;
  specialCharsInPattern;
  private specialKeys: Array<string> = ['Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Control', 'Enter'];
  deleteKeys: Array<string> = ['Backspace', 'Del', 'Delete'];
  constructor(private el: ElementRef,
    private _renderer: Renderer2) { }

  ngOnDestroy(): void {
    this._renderer.destroy();
  }

  ngOnChanges(changes: SimpleChange) {
    if (changes && changes['mask']) {
      if (this.mask == MaskState.ON) {
        this.formatValue(this.unmaskedValue);
      } else {
        this.formatValue(this.unmaskedValue);
      }
    }
  }

  ngAfterViewInit(): void {
    this.numOfSpecialChars = this.maskPattern.replaceAll('x', '').replaceAll('u', '')?.length;
    this.specialCharsInPattern = [...new Set(this.maskPattern.replaceAll('x', '').replaceAll('u', ''))];
    this._renderer.listen(this.el.nativeElement, 'keypress', (event) => {
      event.preventDefault();
      if (this.unmaskedValue.length >= (this.maxlength - this.numOfSpecialChars)) {
        this.formatValue(this.unmaskedValue);
        return;
      }
      if(event.key != 'undefined') {
      this.unmaskedValue += event.key;
      }
      this.formatValue(this.unmaskedValue);
    });
    this._renderer.listen(this.el.nativeElement, 'keydown', (event) => {
      if (this.specialKeys.includes(event.key)) {
        event.preventDefault();
      }
      return;
    });
  }

  ngOnInit(): void {
    this.numOfSpecialChars = this.maskPattern.match(/[^a-zA-Z0-9]/);
    if (this.dataType) {
      switch (this.dataType) {
        case MaskDataType.TEXT:
          this.allowedPattern = /^[A-Za-z]/;
          break;
        case MaskDataType.NUMERIC:
          this.allowedPattern = /^[0-9]/
          break;
        case MaskDataType.ALPHANUMERIC:
          this.allowedPattern = /^[A-Za-z0-9]/
          break;
        case MaskDataType.ALLOWALL:
          this.allowedPattern = /^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/
          break;
        default:
          this.allowedPattern = /^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/;
      }
    }
  }

  formatValue(value) {
    var substr = [];
    let newStr = '';
    let index = 0;
    if (value.length > 0) {
      substr = this.maskPattern.split('');
      for (let i = 0; i < substr.length; i++) {
        if (index < value.length) {
          if(substr[i]) {
          if (substr[i] == 'x') {
            if (this.mask == MaskState.ON) {
              newStr += '*';
            } else {
              newStr += value[index];
            }
            index++;
          }
          else if (substr[i] == 'u') {
            newStr += value[index];
            index++;
          }
          else {
            newStr += substr[i];
          }
        } else {
          break;
        }
      }
      };
    }
    this.el.nativeElement.value = newStr;
  }

  @HostListener("ngModelChange", ["$event"])
  onModelChange(event) {    
    if (event == "") {
      this.unmaskedValue = "";
    }
    event.replaceAll('undefined', '');
    this.specialCharsInPattern.forEach(element => {
      event = event.replaceAll(element, '');
    });
    this.unmaskedValue = this.unmaskedValue.substring(0, event.length);
  }
}
