import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.scss']
})
export class ScrollUpComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject()
  scrollEvent$: Subscription

  @ViewChild('scrollUp') scrollUp: ElementRef<HTMLDivElement>

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  ngAfterViewInit() {
    this.scrollEvent$ = fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onScroll()
    })
  }

  onScroll() {
    if (this.scrollUp) {
      if (window.scrollY > 200) {
        this.scrollUp.nativeElement.classList.remove('disabled')
      } else {
        this.scrollUp.nativeElement.classList.add('disabled')
      }
    }
  }

  onScrollUpClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
