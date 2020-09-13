import {  AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface IIndicator {
  id: number
  active: boolean
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {
  counter = 1
  slideWidth = 0
  indicators: IIndicator[] = []

  @ViewChild('sliderContent') sliderContent: ElementRef<HTMLDivElement>
  @ViewChild('slide') slide: ElementRef<HTMLDivElement>

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const width = window.getComputedStyle(this.slide.nativeElement).width
    this.setSlideWidth(width)
    this.initIndicators(this.sliderContent.nativeElement.children)

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
    sliderContent.style.transition = ''

    this.setIndicators()
  }

  setSlideWidth(width: string) {
    let numberWidth = parseInt(width.match(/\d+/)[0])
    this.slideWidth = numberWidth
  }

  setIndicators() {
    let iCounter = this.counter

    if (this.counter > this.indicators.length) {
      iCounter = 1
    } else if (this.counter < 1) {
      iCounter = this.indicators.length
    }

    this.indicators.forEach(indicator => {
      indicator.active = indicator.id === iCounter ? true : false
    })
  }

  initIndicators(children: HTMLCollection) {
    for (let i = 1; i <= children.length - 2; i++) {
      this.indicators.push({
        id: i,
        active: i === this.counter ? true : false
      })
    }
  }

  onIndicatorClick(id: number) {
    this.sliderContent.nativeElement.style.left = -(this.slideWidth * id) + 'px'
    this.sliderContent.nativeElement.style.transition = ''
    this.counter = id
    
    this.setIndicators()
  }

}
