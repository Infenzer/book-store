export default class ReviewApiDto {
  authorName: string
  message?: string
  date: string
  score: number
  bookId: string

  constructor(dto: ReviewApiDto) {
    this.authorName = dto.authorName
    this.message = dto.message
    this.date = dto.date
    this.score = dto.score
    this.bookId = dto.bookId
  }
}
