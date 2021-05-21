import axios from 'axios'

export interface CoverData {
  src: string
}

class CoversAPI {
  getBooks (isbn: string): Promise<CoverData> {
    return axios.get<CoverData>(`http://openlibrary.org/isbn/${isbn}.json`).then(({ data }) => data)
  }
}

const coversAPI = new CoversAPI()

export default coversAPI