import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent implements OnInit {
  reviewScore = 0

  @ViewChildren('star') stars: QueryList<ElementRef<HTMLDivElement>>

  constructor(private modalRef: MatDialogRef<ReviewModalComponent>) { }

  ngOnInit(): void {
  }

  sendReview() {

  }

  closeModal() {
    this.modalRef.close()
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
