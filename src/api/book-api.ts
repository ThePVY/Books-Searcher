import axios from 'axios'

export interface BookData {
  publishers: string[]
}

class BookAPI {
  getBooks (isbn: string): Promise<BookData> {
    return axios.get<BookData>(`http://openlibrary.org/isbn/${isbn}.json`).then(({ data }) => data)
  }
}

const bookAPI = new BookAPI()

export default bookAPI
