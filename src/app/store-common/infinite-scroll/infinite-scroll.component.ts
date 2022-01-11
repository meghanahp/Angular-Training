import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit, AfterViewInit {
  @Input() options = {};
  @Output() loadMore: EventEmitter<any> = new EventEmitter();
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;
  constructor(private host: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { 
    
    const options = {
      root: this.isHostScrollable() ? this.anchor.nativeElement : null,
      ...this.options
    };
    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.loadMore.emit(true);
    }, options);     
    this.observer.observe(this.anchor.nativeElement);
  }


  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);
    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  private get element() {
    return this.host.nativeElement;
  }

}
