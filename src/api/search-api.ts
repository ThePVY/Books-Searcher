import axios from 'axios'

export interface SearchData {
  numFound: number
  start: string
  docs: DocData[]
}

export interface DocData {
  has_fulltext: boolean
  title: string
  isbn: string[]
}

class SearchAPI {
  getBooks (queryString: string): Promise<SearchData> {
    return axios.get<SearchData>(`http://openlibrary.org/search.json?q=${queryString}`).then(({ data }) => data)
  }
}

const searchAPI = new SearchAPI()

export default searchAPI
