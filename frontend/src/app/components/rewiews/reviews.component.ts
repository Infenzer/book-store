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

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {

  clientIsAuth: boolean

  destroy$ = new Subject()
  bookDetails$: Observable<IBook>
  clientIsAuth$: Observable<boolean>

  reviews: ReviewApiDto[]
  constructor(private dialog: MatDialog, private reviewService: ReviewService, private store: Store<State>) {
    this.bookDetails$ = store.select(selectBookDetails)
    this.clientIsAuth$ = store.select(state => state.client.isAuth)
  }

  ngOnInit(): void {
    this.clientIsAuth$.pipe(takeUntil(this.destroy$)).subscribe(isAuth => this.clientIsAuth = isAuth)
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
      this.reviews = reviews
    })
  }

  getArrayScore(score: number) {
    return new Array(5).fill(null).map((_, i) => i < score ? 'gold' : 'grey');
  }

  openReviewModal() {
    if (this.clientIsAuth) {
      this.dialog.open(ReviewModalComponent).afterClosed().subscribe((createdReview: ReviewApiDto) => {
        if (createdReview) {
          this.reviews.push(createdReview)
        }
      })
    }
  }

}
