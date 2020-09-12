import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlide]'
})
export class SlideDirective implements AfterViewInit {
  sliderContentNode: HTMLDivElement
  
  @Input('slider') slider: HTMLDivElement
  @Output() slideWidth = new EventEmitter<number>()

  constructor(private elem: ElementRef<HTMLDivElement>, private renderer: Renderer2) {}
  
  ngAfterViewInit() {
    this.init()
  }

  init() {
    this.sliderContentNode  = <HTMLDivElement>this.elem.nativeElement.firstChild
    const firstChild = <HTMLDivElement>this.sliderContentNode.firstChild.cloneNode(true)
    const lastChild = <HTMLDivElement>this.sliderContentNode.lastChild.cloneNode(true)

    firstChild.id = 'end'
    lastChild.id = 'start'

    this.slideWidth.emit( parseInt(firstChild.style.width.match(/\d+/)[0]) )

    this.elem.nativeElement.style.height = firstChild.style.height
    this.elem.nativeElement.style.width = firstChild.style.width

    this.slider.style.height = firstChild.style.height

    this.renderer.insertBefore(this.sliderContentNode, lastChild, this.sliderContentNode.firstChild)
    this.renderer.appendChild(this.sliderContentNode, firstChild)

    this.sliderContentNode.style.left = `-${firstChild.style.width}`
  }

}
