export default class ReviewApiDto {
  owner?: Owner
  message?: string
  date?: string
  score: number
  bookId: string

  constructor(dto: ReviewApiDto) {
    this.owner = dto.owner
    this.message = dto.message
    this.date = dto.date
    this.score = dto.score
    this.bookId = dto.bookId
  }
}

export class Owner {
  id: number
  email: string
  login: string
}
