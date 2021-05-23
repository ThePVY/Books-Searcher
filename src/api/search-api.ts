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
  author_name: string[]
}

class SearchAPI {
  getBooks (search: string): Promise<SearchData> {
    const queryString = search.split(' ').join('+')
    return axios
      .get<SearchData>(`http://openlibrary.org/search.json?q=${queryString}`)
      .then(({ data }) => {
        return data
      })
      .catch((error) => {
        console.log(error)
        return null as SearchData
      })
  }
}

const searchAPI = new SearchAPI()

export default searchAPI
