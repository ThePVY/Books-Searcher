import { openLibraryAxios } from './search-api'

export interface BookData {
  isbn: string
  publishers: string[] | null
  number_of_pages: number | null
  publish_date: string | null
}

class BooksAPI {
  getBook(isbn: string): Promise<BookData> {
    return openLibraryAxios
      .get<BookData>(`http://openlibrary.org/isbn/${isbn}.json`)
      .then(({ data }) => {
        return data
      })
      .catch((error) => {
        console.log(error)
        return null as BookData
      })
  }
}

const booksAPI = new BooksAPI()

export default booksAPI
