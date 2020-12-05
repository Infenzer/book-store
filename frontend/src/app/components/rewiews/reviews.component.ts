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

  reviews: ReviewApiDto[] = [
    {message: 'Крутая книга1', authorName: '123', date: '10.10.2020', score: 2},
    {message: 'Крутая книга2', authorName: '123', date: '10.10.2020', score: 5},
    {message: 'Крутая книга3', authorName: '123', date: '10.10.2020', score: 5},
    {message: 'Крутая книга4', authorName: '123', date: '10.10.2020', score: 5},
    {message: 'Крутая книга5', authorName: '123', date: '10.10.2020', score: 5},
    {message: 'Крутая книга6', authorName: '123', date: '10.10.2020', score: 2},
    {message: 'Крутая книга7', authorName: '123', date: '10.10.2020', score: 5},
    {message: 'Крутая книга8', authorName: '123', date: '10.10.2020', score: 5},
    {message: 'Крутая книга9', authorName: '123', date: '10.10.2020', score: 5},
    {message: 'Крутая книга10', authorName: '123', date: '10.10.2020', score: 5},
  ]

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
