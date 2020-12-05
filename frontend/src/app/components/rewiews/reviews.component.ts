import { Component, OnInit } from '@angular/core';
import ReviewApiDto from '../../../models/ReviewApiDto';
import {MatDialog} from '@angular/material/dialog';
import {ReviewModalComponent} from '../review-modal/review-modal.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  reviews: ReviewApiDto[]
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getArrayScore(score: number) {
    return new Array(5).fill(null).map((_, i) => i < score ? 'gold' : 'grey');
  }

  openReviewModal() {
    this.dialog.open(ReviewModalComponent)
  }

}
