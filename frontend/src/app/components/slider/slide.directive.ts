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
    const firstChild = <HTMLDivElement>this.sliderContentNode.firstElementChild.cloneNode(true)
    const lastChild = <HTMLDivElement>this.sliderContentNode.lastChild.cloneNode(true)
    const width = window.getComputedStyle(this.sliderContentNode.firstElementChild).width
    const height = window.getComputedStyle(this.sliderContentNode.firstElementChild).height

    firstChild.id = 'end'
    lastChild.id = 'start'

    this.slideWidth.emit( parseInt(width.match(/\d+/)[0]) )

    this.elem.nativeElement.style.height = height
    this.elem.nativeElement.style.width = width

    this.slider.style.height = height

    this.renderer.insertBefore(this.sliderContentNode, lastChild, this.sliderContentNode.firstChild)
    this.renderer.appendChild(this.sliderContentNode, firstChild)

    this.sliderContentNode.style.left = `-${width}`
  }

}
