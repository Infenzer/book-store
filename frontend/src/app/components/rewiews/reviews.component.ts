import {Component, OnDestroy, OnInit} from '@angular/core';
import ReviewApiDto from '../../../models/ReviewApiDto';
import {MatDialog} from '@angular/material/dialog';
import {ReviewModalComponent} from '../review-modal/review-modal.component';
import {ReviewService} from '../../services/review.service';
import {Observable, Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectBookDetails, State} from '../../../store';
import {IBook} from '../../../store/types/book';
import {MessageData, MessageModalComponent} from '../message-modal/message-modal.component';
import * as Client from  '../../../store/reducers/client.reducer'

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {

  clientState: Client.State

  destroy$ = new Subject()
  bookDetails$: Observable<IBook>
  clientState$: Observable<Client.State>

  reviews: ReviewApiDto[] = []
  limitedReviews: ReviewApiDto[] = []

  constructor(private dialog: MatDialog, private reviewService: ReviewService, private store: Store<State>) {
    this.bookDetails$ = store.select(selectBookDetails)
    this.clientState$ = store.select(state => state.client)
  }

  ngOnInit(): void {
    this.clientState$.pipe(takeUntil(this.destroy$)).subscribe(state => this.clientState = state)
    this.loadReviews()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  loadReviews() {
    this.bookDetails$.pipe(
      takeUntil(this.destroy$),
      map(bookDetails => bookDetails.id),
      switchMap(bookId => this.reviewService.getReviews(bookId))
    ).subscribe(reviews => {
      console.log(reviews)
      this.reviews = reviews
      this.limitedReviews = reviews.slice(0, 5)
    })
  }

  getArrayScore(score: number) {
    return new Array(5).fill(null).map((_, i) => i < score ? 'gold' : 'grey');
  }

  openReviewModal() {
    if (this.clientState.isAuth && this.checkRepeatReview(true)) {
      this.dialog.open(ReviewModalComponent).afterClosed().subscribe((createdReview: ReviewApiDto) => {
        if (createdReview) {
          this.reviews.push(createdReview)
        }
      })
    }

    if (!this.clientState.isAuth) {
      const messageData: MessageData = {
        message: 'Чтобы написать отзыв необходимо авторизироваться',
        color: 'red'
      }

      this.openMessageModal(messageData)
    }
  }

  openMessageModal(data: MessageData, afterClosedFunc?: () => void) {
    this.dialog.open(MessageModalComponent, {
      data
    }).afterClosed().subscribe(data => {
      if (afterClosedFunc) {
        afterClosedFunc()
      }
    })
  }

  deleteReview(reviewId?: number) {
    const successFunc = ()  => {
      const data: MessageData = {
        message: 'Отзыв успешно удалён'
      }

      this.openMessageModal(data)
    }

    const errorFunc = () => {
      const data: MessageData = {
        message: 'Во время удаления отзыва произошла ошибка',
        color: 'red'
      }

      this.reviews = this.reviews.filter(review => review.id !== reviewId)
      this.openMessageModal(data)
    }

    if (reviewId) {
      this.reviewService.deleteReview(reviewId).pipe(takeUntil(this.destroy$)).subscribe(
        data => successFunc(),
        error => errorFunc()
      )
    }
  }

  checkRepeatReview(chowModalError: boolean = false) {
    if (this.reviews.find(review => review.owner?.id === this.clientState.clientInfo?.id)) {
      if (chowModalError) {
        const data: MessageData = {
          message: 'Отзыв уже существует',
          color: 'red',
        }

        this.openMessageModal(data)
      }

      return false
    }

    return true
  }

  loadMoreReview() {
    this.limitedReviews = this.reviews.slice(0, this.limitedReviews.length + 5)
  }

}
