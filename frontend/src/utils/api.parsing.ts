import { IBook } from '../store/types/book'

export const parseApi = (bookList: IBook[]): IBook[] => {
  const newBookList = Array.from(bookList)

  newBookList.forEach(book => {
    if (!book.volumeInfo.imageLinks) {
      book.volumeInfo.imageLinks = {thumbnail: '../assets/images/no-photo.png'}
    }
  })

  return newBookList
}
