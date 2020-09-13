import {  AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {
  counter = 1
  slideWidth = 0

  @ViewChild('sliderContent') sliderContent: ElementRef<HTMLDivElement>
  @ViewChild('slide') slide: ElementRef<HTMLDivElement>

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const width = window.getComputedStyle(this.slide.nativeElement).width
    this.setSlideWidth(width)

    this.sliderContent.nativeElement.addEventListener('transitionend', () => {
      const sliderContent = this.sliderContent.nativeElement

      if (sliderContent.children[this.counter].id === 'end') {
        sliderContent.style.transition = 'none'
        sliderContent.style.left = `-${this.slideWidth}px`
        this.counter = 1
      } else if (this.counter < 1) {
        const maxLeftPosition = -(this.slideWidth * (sliderContent.children.length - 2))

        this.sliderContent.nativeElement.style.transition = 'none'
        sliderContent.style.left = maxLeftPosition + 'px'
        this.counter = sliderContent.children.length - 2
      }
    }) 
  }

  onArrowClick(type: 'left' | 'right') {
    const sliderContent = this.sliderContent.nativeElement
    let leftPosition = parseInt(sliderContent.style.left.substr(0, sliderContent.style.left.length - 2))

    if (
      this.counter >= this.sliderContent.nativeElement.children.length - 1 ||
      this.counter <= 0
    ) return

    if (type === 'left') {
      this.counter--
      leftPosition += this.slideWidth
    } else {
      this.counter++
      leftPosition -= this.slideWidth
    }

    sliderContent.style.left = leftPosition + 'px'
    this.sliderContent.nativeElement.style.transition = ''
  }

  setSlideWidth(width: string) {
    let numberWidth = parseInt(width.match(/\d+/)[0])
    this.slideWidth = numberWidth
  }

}
