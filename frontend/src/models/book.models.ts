export interface IBookResponce {
  items: IBook[]
  kind: string
  totalItems: number
}

export interface IAccesInfo {
  accessViewStatus: string
  country: string
  embeddable: boolean
  epub: {isAvailable: boolean}
  pdf: {isAvailable: boolean}
  publicDomain: boolean
  quoteSharingAllowed: boolean
  textToSpeechPermission: string
  viewability: string
  webReaderLink: string
}

export interface ISaleInfo {
  buyLink: string
  country: string
  isEbook: boolean
  listPrice: {amount: number, currencyCode: string}
  retailPrice: {amount: number, currencyCode: string}
  saleability: string
}

export interface IImageLinks {
  smallThumbnail?: string
  thumbnail?: string
}

export interface IVolumeInfo {
  allowAnonLogging: boolean
  authors: string[]
  canonicalVolumeLink: string
  categories: string[]
  contentVersion: string
  description: string
  imageLinks?: IImageLinks
  industryIdentifiers: {identifier: string, type: string}[]
  infoLink: string
  language: string
  maturityRating: string
  pageCount: number
  panelizationSummary: {containsEpubBubbles: boolean, containsImageBubbles: boolean}
  previewLink: string
  printType: string
  publishedDate: string
  publisher: string
  readingModes: {text: boolean, image: boolean}
  subtitle: string
  title: string
}

export interface IBook {
  accessInfo: IAccesInfo
  etag: string
  id: string
  kind: string
  saleInfo: ISaleInfo
  searchInfo: {textSnippet: string}
  selfLink: string
  volumeInfo: IVolumeInfo
}