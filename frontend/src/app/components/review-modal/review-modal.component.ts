import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ReviewService} from '../../services/review.service';
import {Store} from '@ngrx/store';
import {State} from '../../../store';
import {Observable, Subject} from 'rxjs';
import {IClient} from '../../../store/types/client';
import {takeUntil} from 'rxjs/operators';
import ReviewApiDto from '../../../models/ReviewApiDto';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent implements OnInit, OnDestroy {
  reviewScore = 0
  message: string
  clientInfo: IClient
  bookId: string
  errorMessage: string

  clientInfo$: Observable<IClient>
  bookId$: Observable<string>
  destroy$ = new Subject()

  @ViewChildren('star') stars: QueryList<ElementRef<HTMLDivElement>>

  constructor(
    private modalRef: MatDialogRef<ReviewModalComponent, ReviewApiDto>,
    private reviewService: ReviewService,
    private store: Store<State>
  ) {
    this.clientInfo$ = store.select(state => state.client.clientInfo)
    this.bookId$ = store.select(state => state.book.bookDetails.id)
  }

  ngOnInit(): void {
    this.clientInfo$.pipe(takeUntil(this.destroy$)).subscribe(clientInfo => this.clientInfo = clientInfo)
    this.bookId$.pipe(takeUntil(this.destroy$)).subscribe(bookId => this.bookId = bookId)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  sendReview() {
    if (!this.reviewScore) {
      this.setErrorMessage("Неоходимо поставить оценку")
      return
    }

    if (this.clientInfo?.id) {
      this.reviewService.saveReview(this.clientInfo.id,{
        bookId: this.bookId,
        message: this.message,
        score: this.reviewScore
      }).subscribe((message) => {
        this.closeModal(message)
        console.log(message)
      })
    }
  }

  setErrorMessage(message: string) {
    this.errorMessage = message

    setTimeout(() => {
      this.errorMessage = ''
    }, 5000)
  }

  closeModal(review?: ReviewApiDto) {
    this.modalRef.close(review)
  }

  getStars() {
    return new Array(5).fill(null).map((_, i) => i + 1)
  }

  onMouseEnter(id: number) {
    this.stars.forEach(elem  => {
      if (Number(elem.nativeElement.id) <= id) {
        elem.nativeElement.style.color = 'gold'
      } else {
        elem.nativeElement.style.color = 'grey'
      }
    })

  }

  setScore(id: number) {
    this.reviewScore = id
  }

  resetStars() {
    this.stars.forEach(elem  => {
      if (Number(elem.nativeElement.id) > this.reviewScore) {
        elem.nativeElement.style.color = 'grey'
      } else {
        elem.nativeElement.style.color = 'gold'
      }
    })
  }

}
