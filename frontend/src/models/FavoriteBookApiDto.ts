import {IBook} from '../store/types/book';

export default class FavoriteBookApiDto {
  bookId: string
  title: string
  saleability?: string
  amount?: number
  currencyCode?: string
  thumbnail?: string
  authors: string[]

  constructor(dto: FavoriteBookApiDto) {
    this.bookId = dto.bookId
    this.title = dto.title
    this.saleability = dto?.saleability
    this.amount = dto?.amount
    this.currencyCode = dto?.currencyCode
    this.thumbnail = dto?.thumbnail
    this.authors = dto.authors
  }

  static toDto(book: IBook) {
    return new FavoriteBookApiDto({
      bookId: book.id,
      title: book.volumeInfo.title,
      saleability: book.saleInfo?.saleability,
      amount: book.saleInfo.retailPrice?.amount,
      currencyCode: book.saleInfo.retailPrice?.currencyCode,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      authors: book.volumeInfo?.authors
    })
  }
}
