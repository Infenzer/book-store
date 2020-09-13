import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlide]'
})
export class SlideDirective implements AfterViewInit {
  sliderContentNode: HTMLDivElement
  slideCount = 0
  
  @Input('slider') slider: HTMLDivElement

  constructor(private elem: ElementRef<HTMLDivElement>, private renderer: Renderer2) {}
  
  ngAfterViewInit() {
    this.init()
  }

  init() {
    this.sliderContentNode  = <HTMLDivElement>this.elem.nativeElement.firstChild
    const firstChild = <HTMLDivElement>this.sliderContentNode.firstChild.cloneNode(true)
    const lastChild = <HTMLDivElement>this.sliderContentNode.lastChild.cloneNode(true)
    const width = window.getComputedStyle(this.sliderContentNode.firstElementChild).width
    const height = window.getComputedStyle(this.sliderContentNode.firstElementChild).height

    this.slideCount = this.sliderContentNode.children.length

    firstChild.id = 'end'
    lastChild.id = 'start'

    this.elem.nativeElement.style.height = height
    this.elem.nativeElement.style.width = width
    this.slider.style.height = height

    this.renderer.insertBefore(this.sliderContentNode, lastChild, this.sliderContentNode.firstChild)
    this.renderer.appendChild(this.sliderContentNode, firstChild)

    this.sliderContentNode.style.transition = 'none'
    this.sliderContentNode.style.left = `-${width}`
  }

}
