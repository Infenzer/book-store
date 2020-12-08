import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../../config';
import ReviewApiDto from '../../models/ReviewApiDto';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = `${baseUrl}/api/review`

  constructor(private http: HttpClient) { }

  saveReview(clientId: number, review: ReviewApiDto) {
    return this.http.post<ReviewApiDto>(`${this.baseUrl}/${clientId}`, review)
  }

  getReviews(bookId: string) {
    console.log(bookId)
    return this.http.get<ReviewApiDto[]>(`${this.baseUrl}/${bookId}`)
  }
}
